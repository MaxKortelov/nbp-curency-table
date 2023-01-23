import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { CurrenciesDTO, CurrencyRate } from '../../models/currency-table';

@Injectable({
  providedIn: 'root'
})
export class CurrencyTableService {
  getCurrentCurrencies(): Observable<CurrencyRate[]> {
    return this.http
      .get<CurrenciesDTO[]>('https://api.nbp.pl/api/exchangerates/tables/A/?format=json')
      .pipe(pluck('0', 'rates'));
  }

  getFilteredCurrencies(date: string): Observable<CurrencyRate[]> {
    return this.http
      .get<CurrenciesDTO>(`https://api.nbp.pl/api/exchangerates/tables/A/${date}/?format=json`)
      .pipe(pluck('0', 'rates'));
  }

  constructor(private http: HttpClient) {}
}
