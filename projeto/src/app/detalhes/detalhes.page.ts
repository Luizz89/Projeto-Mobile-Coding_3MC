import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonButtons, IonIcon, IonSearchbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline } from 'ionicons/icons';
import { DrinkService } from '../services/drink';
import { forkJoin, Observable } from 'rxjs';
import { GoldenToastDirective } from '../directives/golden-toast.directive';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonButton, IonButtons, IonIcon, IonSearchbar,
    FormsModule, RouterModule,
    GoldenToastDirective
  ]
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
      const ingrediente = termo.replace('#', '').trim();

      this.drinkService.buscarPorIngrediente(ingrediente).subscribe({
        next: (dados: any) => {
          const lista = dados.drinks ?? [];

          if (lista.length === 0) {
            this.mensagem = 'Nenhum drink encontrado.';
            this.drinks = [];
            return;
          }

          const requisicoes: Observable<any>[] = lista.map((d: any) =>
            this.drinkService.buscarPorId(d.idDrink)
          );

          forkJoin(requisicoes).subscribe({
            next: (resultados: any[]) => {
              this.drinks = resultados
                .map((r: any) => r.drinks?.[0])
                .filter(Boolean);
              this.mensagem = '';
            },
            error: () => { this.mensagem = 'Erro ao buscar detalhes.'; }
          });
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