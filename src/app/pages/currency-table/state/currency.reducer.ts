import { Action, createReducer, on } from '@ngrx/store';

import { CurrencyRate } from '../../../models/currency-table';
import * as fromCurrencyActions from './currency.actions';

export enum CurrencyStatus {
  LOADING = 'LOADING',
  IDLE = 'IDLE',
  DATA = 'DATA',
  ERROR = 'ERROR'
}

export interface CurrencyState {
  currencies: CurrencyRate[];
  currencyStatus: CurrencyStatus;
  error: string;
}

export function getInitialState(): CurrencyState {
  return {
    currencies: [],
    currencyStatus: CurrencyStatus.IDLE,
    error: ''
  };
}

export const currency = createReducer(
  getInitialState(),
  on(fromCurrencyActions.loadCurrentCurrenciesSuccess, (state, { currencies }) => ({
    ...state,
    currencies,
    currencyStatus: CurrencyStatus.DATA,
    error: ''
  })),
  on(fromCurrencyActions.loadCurrentCurrenciesError, (state, { error }) => ({
    ...state,
    currencyStatus: CurrencyStatus.ERROR,
    error
  }))
);

export function currencyReducer(state: CurrencyState, action: Action): any {
  return currency(state, action);
}
