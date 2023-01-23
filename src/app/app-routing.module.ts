import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrencyTableComponent } from './pages/currency-table/currency-table.component';

const routes: Routes = [
  { path: 'currencies', pathMatch: 'full', component: CurrencyTableComponent },
  { path: '', pathMatch: 'full', redirectTo: 'currencies' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
