import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  private cache = new Map<string, string>();

  // Conversões de volume para ml (multiplicadores)
  private conversoesVolume: { regex: RegExp; converter: (val: number) => string }[] = [
    {
      // 1.5 oz → 45 ml
      regex: /(\d+(?:[.,]\d+)?)\s*fl\.?\s*oz/gi,
      converter: (val) => `${Math.round(val * 29.5)} ml`
    },
    {
      // 1.5 oz → 45 ml
      regex: /(\d+(?:[.,]\d+)?)\s*oz/gi,
      converter: (val) => `${Math.round(val * 29.5)} ml`
    },
    {
      // 1 cup → 240 ml
      regex: /(\d+(?:[.,]\d+)?)\s*cups?/gi,
      converter: (val) => `${Math.round(val * 240)} ml`
    },
    {
      // 1 tsp → 5 ml
      regex: /(\d+(?:[.,]\d+)?)\s*tsps?/gi,
      converter: (val) => `${Math.round(val * 5)} ml`
    },
    {
      // 1 tbsp / tblsp → 15 ml
      regex: /(\d+(?:[.,]\d+)?)\s*tbl?sps?/gi,
      converter: (val) => `${Math.round(val * 15)} ml`
    },
    {
      // 1 shot → 30 ml
      regex: /(\d+(?:[.,]\d+)?)\s*shots?/gi,
      converter: (val) => `${Math.round(val * 30)} ml`
    },
    {
      // 1 cl → 10 ml
      regex: /(\d+(?:[.,]\d+)?)\s*cl/gi,
      converter: (val) => `${Math.round(val * 10)} ml`
    },
  ];

  // Medidas sem número (qualitativas) — não convertem, só traduzem
  private medidasQualitativas: { [key: string]: string } = {
    'dash': 'pitada',
    'dashes': 'pitadas',
    'drop': 'gota',
    'drops': 'gotas',
    'splash': 'respingo',
    'part': 'parte',
    'parts': 'partes',
    'whole': 'inteiro',
    'ground': 'moído',
    'fresh': 'fresco',
    'large': 'grande',
    'small': 'pequeno',
    'medium': 'médio',
    'slice': 'fatia',
    'slices': 'fatias',
    'wedge': 'pedaço',
    'wedges': 'pedaços',
    'twist': 'casca',
    'handful': 'punhado',
    'pinch': 'pitada',
    'to taste': 'a gosto',
    'garnish': 'para decorar',
  };

  // Correções de tradução incorreta
  private correcoes: { [key: string]: string } = {
    'lima': 'limão',
    'Lima': 'Limão',
    'suco de lima': 'suco de limão',
    'Suco de Lima': 'Suco de Limão',
    'suco de lima-da-pérsia': 'suco de limão',
    'vodca': 'vodka',
    'Vodca': 'Vodka',
    'gim': 'gin',
    'Gim': 'Gin',
    'xerez': 'sherry',
    'Xerez': 'Sherry',
    'imagem móvel': 'Mobile Image',
    'Imagem Móvel': 'Mobile Image',
    'imagem mobile': 'Mobile Image',
    'Imagem Mobile': 'Mobile Image',
    // Evita que a API retraduz unidades já convertidas
    'mililitros': 'ml',
    'Mililitros': 'ml',
  };

  constructor(private http: HttpClient) {}

  async traduzir(texto: string): Promise<string> {
    if (!texto || !texto.trim()) return texto;

    if (this.cache.has(texto)) {
      return this.cache.get(texto)!;
    }

    try {
      const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(texto)}&langpair=en|pt-BR`;
      const resposta: any = await firstValueFrom(this.http.get(url));
      let traducao = resposta?.responseData?.translatedText ?? texto;

      // Aplica conversões e correções APÓS a tradução
      traducao = this.converterMedidas(traducao);
      traducao = this.aplicarMedidasQualitativas(traducao);
      traducao = this.aplicarCorrecoes(traducao);

      this.cache.set(texto, traducao);
      return traducao;
    } catch {
      let fallback = this.converterMedidas(texto);
      fallback = this.aplicarMedidasQualitativas(fallback);
      return this.aplicarCorrecoes(fallback);
    }
  }

  async traduzirVarios(textos: string[]): Promise<string[]> {
    return Promise.all(textos.map(t => this.traduzir(t)));
  }

  // Converte medidas com número para ml
  private converterMedidas(texto: string): string {
    let resultado = texto;
    for (const { regex, converter } of this.conversoesVolume) {
      resultado = resultado.replace(regex, (_, num) => {
        const valor = parseFloat(num.replace(',', '.'));
        return converter(valor);
      });
    }
    return resultado;
  }

  // Traduz medidas qualitativas (sem número)
  private aplicarMedidasQualitativas(texto: string): string {
    let resultado = texto;
    for (const [en, pt] of Object.entries(this.medidasQualitativas)) {
      const regex = new RegExp(`\\b${en}\\b`, 'gi');
      resultado = resultado.replace(regex, pt);
    }
    return resultado;
  }

  private aplicarCorrecoes(texto: string): string {
    let resultado = texto;
    for (const [errado, correto] of Object.entries(this.correcoes)) {
      const regex = new RegExp(`\\b${errado}\\b`, 'g');
      resultado = resultado.replace(regex, correto);
    }
    return resultado;
  }
}