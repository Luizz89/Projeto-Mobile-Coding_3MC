import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonButtons, IonIcon, IonSearchbar, IonList, IonItem, IonLabel, IonImg } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline } from 'ionicons/icons';
import { DrinkService } from '../services/drink';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonButtons, IonIcon,
    IonSearchbar, IonList, IonItem, IonLabel,
    IonImg, FormsModule, RouterModule]
})

export class DetalhesPage implements OnInit {

  termoBusca: string = '';
  drinks: any[] = [];
  mensagem: string = '';

  constructor(
    private drinkService: DrinkService,
    private router: Router
  ) {
    addIcons({ arrowBackOutline });
  }

  ngOnInit() {}

  buscar() {
    if (!this.termoBusca.trim()) return;

    const termo = this.termoBusca.trim();

    if (termo.startsWith('#')) {
      const ingrediente = termo.replace('#', '');
      this.drinkService.buscarPorIngrediente(ingrediente).subscribe({
        next: (dados: any) => {
          this.drinks = dados.drinks ?? [];
          this.mensagem = this.drinks.length === 0 ? 'Nenhum drink encontrado.' : '';
        },
        error: () => { this.mensagem = 'Erro ao buscar drinks.'; }
      });

    } else {
      this.drinkService.buscarPorNome(termo).subscribe({
        next: (dados: any) => {
          this.drinks = dados.drinks ?? [];
          this.mensagem = this.drinks.length === 0 ? 'Nenhum drink encontrado.' : '';
        },
        error: () => { this.mensagem = 'Erro ao buscar drinks.'; }
      });
    }
  }

  verDetalhes(id: string) {
    this.router.navigate(['/resultado', id]);
  }

  voltarHome() {
    this.router.navigate(['/home']);
  }
}