import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';

import { CurrencyTableComponent } from './currency-table.component';
import { CurrencyEffects } from './state/currency.effects';
import { currencyReducer } from './state/currency.reducer';

@NgModule({
  declarations: [CurrencyTableComponent],
  imports: [
    CommonModule,
    CalendarModule,
    ButtonModule,
    FormsModule,
    BrowserAnimationsModule,
    TableModule,
    ScrollingModule,
    EffectsModule.forFeature([CurrencyEffects]),
    StoreModule.forFeature('currency', currencyReducer),
    PaginatorModule,
    DialogModule
  ]
})
export class CurrencyTableModule {}
