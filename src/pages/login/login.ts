import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { TabsPage } from '../tabs/tabs';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  @Input() data: any={
    txtUsername:'Usuario',
    txtPassword:'Contraseña',
    btnLogin:'Ingresar',
    txtForgotPassword:'Olvidé mi contraseña',
    btnResetYourPassword:'Restablecer',
    txtSignupnow:'Registrarme',
    btnSignupnow:'Boton',
    logo:'assets/icon/icon.png',
    title:'TasWeb',
    subtitle:'Alistamiento'
  }
  @Input() events: any={}

  public username: string;
  public password: string;


  


  constructor(private _nav:NavController) { 
    
  }

  onSubmit(){
    this._nav.push(TabsPage)
  }

}
