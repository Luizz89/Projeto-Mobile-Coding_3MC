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
import { TranslateService } from '../services/translate.service';
import { TeorAlcoolicoPipe } from '../teor-alcoolico-pipe';
import { CommonModule } from '@angular/common';

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
    FormsModule, TeorAlcoolicoPipe, CommonModule,
    RevealOnScrollDirective
  ]
})
export class ResultadoPage implements OnInit {

  carregando: boolean = true;
  erro: boolean = false;
  drink: any = null;
  ingredientes: { nome: string, medida: string }[] = [];

  instrucoesTraduzidas: string = '';
  categoriaTraduzida: string = '';
  copoTraduzido: string = '';

  constructor(
    private route: ActivatedRoute,
    private drinkService: DrinkService,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.carregarDrink(id!);
  }

  carregarDrink(id: string) {
    this.carregando = true;
    this.erro = false;

    this.drinkService.buscarPorId(id).subscribe({
      next: async (dados: any) => {
        if (dados.drinks && dados.drinks.length > 0) {
          const drinkApi = dados.drinks[0];
          this.drink = {
            ...drinkApi,
            teorAlcoolico: Math.floor(Math.random() * 51),
            preco: Math.floor(Math.random() * 31) + 30
          };
          this.extrairIngredientes();
          await this.traduzirCampos();
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

  async traduzirCampos() {
    const [instrucoes, categoria, copo] = await this.translateService.traduzirVarios([
      this.drink.strInstructions ?? '',
      this.drink.strCategory ?? '',
      this.drink.strGlass ?? ''
    ]);

    this.instrucoesTraduzidas = instrucoes;
    this.categoriaTraduzida = categoria;
    this.copoTraduzido = copo;

    const nomes = this.ingredientes.map(i => i.nome);
    const medidas = this.ingredientes.map(i => i.medida);

    const [nomesTraduzidos, medidasTraduzidas] = await Promise.all([
      this.translateService.traduzirVarios(nomes),
      this.translateService.traduzirVarios(medidas)
    ]);

    this.ingredientes = this.ingredientes.map((ing, idx) => ({
      nome: nomesTraduzidos[idx],
      medida: medidasTraduzidas[idx]
    }));
  }
}