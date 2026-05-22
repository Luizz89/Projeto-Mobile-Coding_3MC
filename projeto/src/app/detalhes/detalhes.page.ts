import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonSearchbar, IonList, IonItem, IonLabel, IonImg } from '@ionic/angular/standalone';
import { DrinkService } from '../services/drink';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonSearchbar, IonList, IonItem, IonLabel, IonImg, CommonModule, FormsModule]
})
export class DetalhesPage implements OnInit {

  termoBusca: string = '';
  drinks: any[] = [];
  mensagem: string = '';

  constructor(private drinkService: DrinkService) {}

  ngOnInit() {}

  buscar() {
    if (!this.termoBusca.trim()) return;

    this.drinkService.buscarPorNome(this.termoBusca).subscribe({
      next: (dados: any) => {
        this.drinks = dados.drinks ?? [];
        this.mensagem = this.drinks.length === 0 ? 'Nenhum drink encontrado.' : '';
      },
      error: (erro: any) => {
        console.error('Erro:', erro);
        this.mensagem = 'Erro ao buscar drinks.';
      }
    });
  }
}