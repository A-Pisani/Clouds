import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from './country.model';
import { forkJoin } from 'rxjs';  // RxJS 6 syntax
import { Router } from '@angular/router';
import { AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private httpClient: HttpClient,  private router: Router,
              private firestore: AngularFirestore) {}
  countries: any;
  private country: Country | undefined;

apiURL = "https://api.covid19api.com/summary";
// apiURL2 = 'http://api.covid19api.com/world?from=' + formatDate(dt) + 'T00:00:00Z&to=' + formatDate(new Date());
apiURL2 = "https://corona.lmao.ninja/v2/historical/all?lastdays=8";
// apiURL3 = 'http://api.covid19api.com/world?from=2020-04-13T00:00:00Z&to=2021';
apiURL3 = "https://corona.lmao.ninja/v2/historical/all";


apiURL4 = "";
apiURL5 = "";
  getCountries(): any {
    return this.countries;
  }


getCountry(countryN: string){
  console.log(countryN);
  const country =  this.getCountryData(countryN);

  return country;
}
  CountrySpecs(country: any){
    console.log(country);
    const stringDate = country.Date.split('-');
    this.country = {
        Country: country.Country,
        Slug: country.Slug,
        NewConfirmed: country.NewConfirmed,
        TotalConfirmed: country.TotalConfirmed,
        NewDeaths: country.NewDeaths,
        TotalDeaths: country.TotalDeaths,
        NewRecovered: country.NewRecovered,
        TotalRecovered: country.TotalRecovered,
        Date: stringDate[0] + stringDate[1] + stringDate[2].substring(0, 2)
    };
 // if country is cached && day_of_request==day_of_cached
    // retrieve from cache
    const countryUpd = this.getCountryData(this.country.Country);
    if (countryUpd != null && countryUpd.Date === this.country.Date){
       this.country = countryUpd;
    }
    else{
     this.updateCountryData();
    }

    // this.countryN = countryName;
    console.log(this.country);

    const dt = new Date();
    dt.setDate(dt.getDate() - 9);
    console.log(formatDate(dt));
    this.apiURL4 = "https://api.covid19api.com/country/" + this.country?.Slug + "?from=" + formatDate(dt) + "&to=" + formatDate(new Date());
    this.apiURL5 = "https://api.covid19api.com/dayone/country/" + this.country?.Slug;
    this.router.navigate(['country', this.country?.Country]);
  }

  private updateCountryData(){
    this.firestore.collection('countries').doc(this.country?.Country).set({
      Country: this.country?.Country,
      Slug: this.country?.Slug,
      NewConfirmed: this.country?.NewConfirmed,
      TotalConfirmed: this.country?.TotalConfirmed,
      NewDeaths: this.country?.NewDeaths,
      TotalDeaths: this.country?.TotalDeaths,
      NewRecovered: this.country?.NewRecovered,
      TotalRecovered: this.country?.TotalRecovered,
      Date: this.country?.Date
      }, {merge : true});
  }

  private getCountryData(countryN: string): any{
    const docRef = this.firestore.collection('countries').doc(countryN);
    return docRef.get()
    // .subscribe((doc: any) => {
    //     console.log(doc.id, ' => ', doc.data());
        // const Countryyy = {
        //   Country: doc.data().Country,
        //   Slug: doc.data().Slug,
        //   NewConfirmed: doc.data().NewConfirmed,
        //   TotalConfirmed: doc.data().TotalConfirmed,
        //   NewDeaths: doc.data().NewDeaths,
        //   TotalDeaths: doc.data().TotalDeaths,
        //   NewRecovered: doc.data().NewRecovered,
        //   TotalRecovered: doc.data().TotalRecovered,
        //   Date: doc.data().Date
        //   }
        //   this.country = Countryyy
        // } );
  }

  getCountryN(): string | undefined {
    return this.country?.Country;
  }

  getData(){
    // return this.httpClient.get(this.apiURL);
    const response1 = this.httpClient.get(this.apiURL);
    const response2 = this.httpClient.get(this.apiURL2);
    const response3 = this.httpClient.get(this.apiURL3);
    return forkJoin([response1, response2, response3]);
  }
  getDataSummary(){
    // return this.httpClient.get(this.apiURL);
    const response1 = this.httpClient.get(this.apiURL);
    return forkJoin([response1]);
  }

  getData2(countryN: string){
    if(countryN === "Côte d'Ivoire"){
      countryN = 'cote-divoire'
    }else if(countryN === "Venezuela (Bolivarian Republic)"){
      countryN = 'venezuela'
    }else if(countryN === "Congo (Brazzaville)"){
      countryN = 'congo-brazzaville'
    }else if(countryN === "Congo (Kinshasa)"){
      countryN = 'congo-kinshasa'
    }else if(countryN === "United States of America"){
      countryN = 'united-states'
    }else if(countryN === "Holy See (Vatican City State)"){
      countryN = 'holy-see-vatican-city-state'
    }else if(countryN === "Korea (North)"){
      countryN = 'korea-north'
    }else if(countryN === "Korea (South)"){
      countryN = 'korea-south'
    }else if(countryN === "Syrian Arab Republic (Syria)"){
      countryN = 'syria'
    }


    if(countryN === "United States of America"){
      this.apiURL4 = "https://api.covid19api.com/country/" + countryN + "?from=" + formatDate(dt) + "&to=" + formatDate(new Date());
    }else{
      this.apiURL4 = "https://api.covid19api.com/country/" + countryN + "?from=" + formatDate(dt) + "&to=" + formatDate(new Date());

    }
    this.apiURL5 = "https://api.covid19api.com/dayone/country/" + countryN;
    const response4 = this.httpClient.get(this.apiURL4);
    const response5 = this.httpClient.get(this.apiURL5);
    return forkJoin([response4, response5]);
  }
}

const dt = new Date();
const dt2 = new Date();

dt.setDate(dt.getDate() - 8);
dt2.setDate(dt.getDate() - 7);

// console.log(formatDate(dt));

function formatDate(date: Date) {
          let d = new Date(date),
              month = '' + (d.getMonth() + 1),
              day = '' + d.getDate(),
              year = d.getFullYear();

          if (month.length < 2) {
              month = '0' + month;
          }
          if (day.length < 2) {
              day = '0' + day;
          }

          return [year, month, day].join('-');
      }
