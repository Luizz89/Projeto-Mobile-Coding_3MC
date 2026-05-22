import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonGrid, IonRow, IonCol, IonCard, IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonIcon, IonCard, IonCol, IonRow, IonGrid, IonHeader, IonToolbar, IonTitle, IonContent, RouterLink, IonButton],
})
export class HomePage {
  constructor() {}
}
