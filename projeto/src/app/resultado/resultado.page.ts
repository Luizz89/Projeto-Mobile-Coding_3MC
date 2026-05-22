import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar,
  IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonBadge, IonItem, IonLabel, IonList,
  IonImg, IonSpinner, IonText, IonBackButton, IonButtons
} from '@ionic/angular/standalone';
import { DrinkService } from '../services/drink';
import { RevealOnScrollDirective } from '../directives/reveal-on-scroll';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.page.html',
  styleUrls: ['./resultado.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent,
    IonBadge, IonItem, IonLabel, IonList,
    IonImg, IonSpinner, IonText, IonBackButton, IonButtons,
    FormsModule,
    RevealOnScrollDirective  // ← diretiva personalizada
  ]
})
export class ResultadoPage implements OnInit {

  carregando: boolean = true;
  erro: boolean = false;
  drink: any = null;
  ingredientes: { nome: string, medida: string }[] = [];

  constructor(
    private route: ActivatedRoute,
    private drinkService: DrinkService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.carregarDrink(id!);
  }

  carregarDrink(id: string) {
    this.carregando = true;
    this.erro = false;

    this.drinkService.buscarPorId(id).subscribe({
      next: (dados: any) => {
        if (dados.drinks && dados.drinks.length > 0) {
          this.drink = dados.drinks[0];
          this.extrairIngredientes();
        } else {
          this.erro = true;
        }
        this.carregando = false;
      },
      error: () => {
        this.erro = true;
        this.carregando = false;
      }
    });
  }

  // Extrai os ingredientes da API (strIngredient1...15)
  extrairIngredientes() {
    this.ingredientes = [];
    for (let i = 1; i <= 15; i++) {
      const nome = this.drink[`strIngredient${i}`];
      const medida = this.drink[`strMeasure${i}`];
      if (nome && nome.trim()) {
        this.ingredientes.push({ nome, medida: medida?.trim() || 'a gosto' });
      }
    }
  }
}