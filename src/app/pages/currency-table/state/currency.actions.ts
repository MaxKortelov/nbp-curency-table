import { createAction, props } from '@ngrx/store';

import { CurrencyRate, TABLE_HEADERS } from '../../../models/currency-table';

export const loadFilteredCurrencies = createAction('[Currency] Load filtered currencies', props<{ date: string }>());

export const loadCurrentCurrencies = createAction('[Currency] Load current currencies');

export const loadCurrentCurrenciesSuccess = createAction(
  '[Currency] Load current currencies success',
  props<{ currencies: CurrencyRate[] }>()
);

export const loadCurrentCurrenciesError = createAction(
  '[Currency] Load current currencies error',
  props<{ error: string }>()
);
