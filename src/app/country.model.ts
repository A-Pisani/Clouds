export class Country {
  'Country': string;
  'Slug': string;
  'NewConfirmed': number;
  'TotalConfirmed': number;
  'NewDeaths': number;
  'TotalDeaths': number;
  'NewRecovered': number;
  'TotalRecovered': number;
  'Date': string;
}


export class MyObj {
  'Message'!: string;
  'Global'!: string;
  'Countries'!: Country[];
  'Cases'!: number[];
  'Recovered'!: number[];
  'Deaths'!: number[];
}
