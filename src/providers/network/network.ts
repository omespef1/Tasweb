import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs';

//Importo la clase con las url base e información del app
import {appUrlService} from '../../assets/config/config';
//Importa modelo báscico de transacciones
import { Transaction } from '../../app/models/general/network';
import { AlertsProvider } from '../alerts/alerts';

/*
  Generated class for the NetworkProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NetworkProvider {

  baseUrl:string="";
  constructor(public http: HttpClient,private _loading:LoadingController,private _alert:AlertsProvider) {
    console.log('Hello NetworkProvider Provider');
  }

Get(controller: string, loading: boolean = true, content: string = "Cargando...") {
  console.log('haciendo Get...');
  let loadCtrl = this._loading.create({
    content:content,
    spinner:'ios'
  })
  const headerDict = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Origin':'*'
  }

  let bodyRequest: any = {
    headers:  new HttpHeaders(headerDict),              
  }

    return this.http.get(`${this.baseUrl}${controller}`,bodyRequest).retryWhen(error => {
      return error
        .flatMap((error: any) => {
          if (error.status === 503) {
            return Observable.of(error.status).delay(1000)
          }
          return Observable.throw({ error: `Servicio no disponible. Error ${error.status}` });
        })
        .take(5)
        .concat(Observable.throw({ error: `Hubo un error conectando con el servidor, contacte con su administrador` }));
    })
      .subscribe((resp: Transaction) => {      
        if (loading)
          loadCtrl.dismiss();
        if (resp.result == false) {
          this._alert.showToastMessage(resp.message);
          resp = null;
        }
      }, (err: HttpErrorResponse) => {
        // this._events.publish('offBackground');
        console.log(err);
        this._alert.showToastMessage(err.error);
        if (loading)
          loadCtrl.dismiss();
      })

  
}

Post(params: any, urlService: string, content: string = "Cargando..."){
  console.log('haciendo Get...');
  let loadCtrl = this._loading.create({
    content:content,
    spinner:'ios'
  })

  const headerDict = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Origin':'*'
  }

  let bodyRequest: any = {
    headers:  new HttpHeaders(headerDict),              
  }

    return this.http.get(`${this.baseUrl}${urlService}`,bodyRequest).retryWhen(error => {
      return error
        .flatMap((error: any) => {
          if (error.status === 503) {
            return Observable.of(error.status).delay(1000)
          }
          return Observable.throw({ error: `Servicio no disponible. Error ${error.status}` });
        })
        .take(5)
        .concat(Observable.throw({ error: `Hubo un error conectando con el servidor, contacte con su administrador` }));
    })
      .subscribe((resp: Transaction) => {      
          loadCtrl.dismiss();
        if (resp.result == false) {
          this._alert.showToastMessage(resp.message);
          resp = null;
        }
      }, (err: HttpErrorResponse) => {
        console.log(err);
        this._alert.showToastMessage(err.error);
          loadCtrl.dismiss();
      })
}


}
