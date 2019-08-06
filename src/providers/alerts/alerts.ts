import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ToastController} from 'ionic-angular';

/*
  Generated class for the AlertsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AlertsProvider {

  constructor(public http: HttpClient,private _toast:ToastController) {
    console.log('Hello AlertsProvider Provider');
  }

    //Muestra toast con mensaje
    showToastMessage(msg: string, position: string='bottom') {
      let toastCtrl = this._toast.create({
        message: msg,
        position: position,
        duration: 4000,
        closeButtonText: 'OK',
        showCloseButton: true
      });
      toastCtrl.present();
    }
}
