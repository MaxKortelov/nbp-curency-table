import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { CurrencyTableService } from '../currency-table.service';
import * as fromCurrencyActions from './currency.actions';
import { loadCurrentCurrenciesError } from './currency.actions';

@Injectable()
export class CurrencyEffects {
  loadCurrencies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCurrencyActions.loadCurrentCurrencies),
      switchMap(() =>
        this.currencyService
          .getCurrentCurrencies()
          .pipe(map((currencies) => fromCurrencyActions.loadCurrentCurrenciesSuccess({ currencies })))
      ),
      catchError((error) => of(fromCurrencyActions.loadCurrentCurrenciesError({ error: error.message })))
    )
  );

  loadFilteredCurrencies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCurrencyActions.loadFilteredCurrencies),
      switchMap(({ date }) =>
        this.currencyService
          .getFilteredCurrencies(date)
          .pipe(map((currencies) => fromCurrencyActions.loadCurrentCurrenciesSuccess({ currencies })))
      ),
      catchError((error) => of(fromCurrencyActions.loadCurrentCurrenciesError({ error: error.message })))
    )
  );

  constructor(private actions$: Actions, private currencyService: CurrencyTableService) {}
}
