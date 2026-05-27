import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UpperCasePipe, CurrencyPipe } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton
} from '@ionic/angular/standalone';
import { TeorAlcoolicoPipe } from '../teor-alcoolico-pipe';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    RouterLink,
    IonButton,
    TeorAlcoolicoPipe,
    UpperCasePipe,
    CurrencyPipe
  ]
})
export class HomePage {
  nomeDrink = 'caipirinha';
  teor = 20;
  preco = 15.99;

  constructor() {}
}