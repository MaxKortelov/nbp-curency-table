import { createSelector } from '@ngrx/store';

import { CurrencyRate } from '../../../models/currency-table';
import { State } from '../../../state/app-state';
import { CurrencyState, CurrencyStatus } from './currency.reducer';

const selectState = (state: State) => state.currency;

export const selectCurrencies = createSelector<State, CurrencyState, CurrencyRate[]>(
  selectState,
  (s1) => s1.currencies
);

export const selectCurrencyStatus = createSelector<State, CurrencyState, CurrencyStatus>(
  selectState,
  (s1) => s1.currencyStatus
);

export const selectCurrencyErrorMessage = createSelector<State, CurrencyState, string>(selectState, (s1) => s1.error);
