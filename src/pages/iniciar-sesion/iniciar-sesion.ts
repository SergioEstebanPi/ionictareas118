import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { UsuariosProvider } from '../../providers/usuarios/usuarios';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the IniciarSesionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-iniciar-sesion',
  templateUrl: 'iniciar-sesion.html',
})
export class IniciarSesionPage {

	formulario:any;

  constructor(public navCtrl: NavController,
  	public navParams: NavParams,
  	public _usuarios:UsuariosProvider,
  	public _alertCtrl:AlertController) {
  	this.formulario = {
  		auth: {
  			email: "",
  			password: ""
  		}
  	};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IniciarSesionPage');
  }

  iniciarSesion(){
  	this._usuarios
  		.iniciarSesion(this.formulario)
  		.subscribe(
  			respuesta => {	
  					localStorage.setItem("SessionToken", respuesta.jwt);
  					let alerta = this._alertCtrl
  													.create(
									  					{
									  						title: "Bienvenido",
									  						subTitle: "Inicio de sesión exitoso",
									  						buttons: ['OK']
									  					}
								  					);
  					alerta.present();
  			},
  			error => {
  					let alertaError = this._alertCtrl
									.create(
				  					{
				  						title: "Error",
				  						subTitle: "No se pudo iniciar sesión",
				  						buttons: ['OK']
				  					}
			  					);
			  		alertaError.present();			
  			}
  		);

  }

}
