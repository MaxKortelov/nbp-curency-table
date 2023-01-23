import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';

import { CurrencyRate, CurrencyTable, initialCurrencyTable, TABLE_HEADERS } from '../../models/currency-table';
import { State } from '../../state/app-state';
import * as fromCurrencyState from './state';
import * as fromCurrencyActions from './state/currency.actions';
import { CurrencyStatus } from './state/currency.reducer';

@Component({
  selector: 'app-currency-table',
  templateUrl: './currency-table.component.html',
  styleUrls: ['./currency-table.component.scss']
})
export class CurrencyTableComponent implements OnInit {
  date: Date = new Date();
  cols: CurrencyTable[] = initialCurrencyTable();
  initialCurrencies: CurrencyRate[] = [];
  currencies: CurrencyRate[] = [];
  filteredCurrencies: CurrencyRate[] = [];
  filter: TABLE_HEADERS = TABLE_HEADERS.EMPTY;
  maxDate: Date = new Date();

  //paginator
  rowsPerPage = 10;
  rowsPerPageOptions: number[] = [10, 20, 30];
  currentPage = 0;

  //loading status
  errorMessage: string = '';
  isError: boolean = true;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.store
      .select(fromCurrencyState.selectCurrencies)
      .pipe(
        tap((currencies) => (this.currencies = currencies)),
        tap((currencies) => (this.initialCurrencies = currencies)),
        tap(() => this.paginateCurrencies())
      )
      .subscribe();

    this.store
      .select(fromCurrencyState.selectCurrencyStatus)
      .pipe(
        tap((status) => {
          this.isError = status === CurrencyStatus.ERROR;
        })
      )
      .subscribe();

    this.store
      .select(fromCurrencyState.selectCurrencyErrorMessage)
      .pipe(
        tap((error) => {
          this.errorMessage = error;
        })
      )
      .subscribe();

    this.store.dispatch(fromCurrencyActions.loadCurrentCurrencies());
  }

  private paginateCurrencies(): void {
    this.filteredCurrencies = this.currencies.slice(
      this.currentPage * this.rowsPerPage,
      this.currentPage * this.rowsPerPage + this.rowsPerPage
    );
  }

  sortCurrencies(filter: TABLE_HEADERS): void {
    let c: CurrencyRate[] = [...this.initialCurrencies];
    if (filter === TABLE_HEADERS.CURRENCY) {
      c.sort((a, b) => a.currency.localeCompare(b.currency));
    }
    if (filter === TABLE_HEADERS.SYMBOL) {
      c.sort((a, b) => a.code.localeCompare(b.code));
    }
    if (filter === TABLE_HEADERS.RATE) {
      c.sort((a, b) => a.mid - b.mid);
    }

    this.currencies = [...c];
    this.paginateCurrencies();
  }

  handleSelectDate(date: Date): void {
    this.date = date;
    this.store.dispatch(fromCurrencyActions.loadFilteredCurrencies({ date: formatDate(date, 'yyyy-MM-dd', 'en-UK') }));
  }

  handleFilter(filter: TABLE_HEADERS): void {
    this.filter === filter ? (this.filter = TABLE_HEADERS.EMPTY) : (this.filter = filter);
    this.sortCurrencies(this.filter);
  }

  handleClear(): void {
    this.date = new Date();
    this.filter = TABLE_HEADERS.EMPTY;
    this.store.dispatch(fromCurrencyActions.loadCurrentCurrencies());
  }

  paginate(event: any): void {
    this.rowsPerPage = event.rows;
    this.currentPage = event.page;
    this.paginateCurrencies();
  }

  setError(error: boolean): void {
    this.isError = error;
  }
}
