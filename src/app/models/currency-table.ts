export interface CurrenciesDTO {
  table: string;
  no: string;
  effectiveDate: string; //Date
  rates: CurrencyRate[];
}

export interface CurrencyRate {
  currency: string;
  code: string;
  mid: number;
}

export interface CurrencyTable {
  field: TABLE_HEADERS;
  header: string;
}

export enum TABLE_HEADERS {
  SYMBOL = 'code',
  CURRENCY = 'currency',
  RATE = 'mid',
  EMPTY = ''
}

export function initialCurrencyTable(): CurrencyTable[] {
  return [
    { field: TABLE_HEADERS.SYMBOL, header: 'Symbol waluty' },
    { field: TABLE_HEADERS.CURRENCY, header: 'Waluta' },
    { field: TABLE_HEADERS.RATE, header: 'Kurs waluty' }
  ];
}
