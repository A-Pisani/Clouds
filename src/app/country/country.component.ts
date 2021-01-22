import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label, SingleDataSet, Color, Colors } from 'ng2-charts';
import { Subscription } from 'rxjs';
import { News } from 'src/news.model';
import { ApiService } from '../api.service';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

  country: any;
  sub: any;
  countryName: any;
  data!: any;
  data4!: any;
  data5!: any;

  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'Total Deaths' },
    { data: [], label: 'Total Recovered' },
    { data: [], label: 'Total Cases'}
  ];

  public barChartOptions: ChartOptions = {responsive: true };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Daily Deaths' },
    { data: [], label: 'Daily Recovered' },
    { data: [], label: 'Daily New Cases' }
  ];
  public barChartData2: ChartDataSets[] = [
    { data: [], label: 'Daily Deaths' },
    { data: [], label: 'Daily Recovered' },
    { data: [], label: 'Daily New Cases' }
  ];

  public lineChartLabels: Label[] = [];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';

    // Pie
    public pieChartOptions: ChartOptions = {
      responsive: true,
    };
    public pieChartLabels: Label[] = ['Dead Cases', 'Recovered Cases', 'Active Cases'];
    public pieChartData: SingleDataSet = [];
    public pieChartType: ChartType = 'pie';
    public pieChartLegend = true;
    public pieChartPlugins = [];
    public pieChartColors: Color[] = [
      { // red
        backgroundColor: ['rgba(255,99,132,0.6)', 'rgba(54,162,253,0.6)', 'rgba(255,206,86,0.6)'],
        borderColor: ['rgba(255,99,132,0.1)', 'rgba(54,162,253,0.1)', 'rgba(255,206,86,0.1)'],
        hoverBackgroundColor: ['rgba(255,99,132,0.8)', 'rgba(54,162,253,0.8)', 'rgba(255,206,86,0.8)'],
        hoverBorderColor: ['rgba(255,99,132,1)', 'rgba(54,162,253,1)', 'rgba(255,206,86,1)']
      }
    ];
  countryNews: Array<News> = [];


  constructor(private route: ActivatedRoute, public apiService: ApiService,
              public newsService: NewsService) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.countryName = params.countryN;
      console.log(this.countryName);
    });
   // this.country = this.apiService.getCountry(this.countryName);

    const tmp2 =  this.apiService.getCountry(this.countryName);
    tmp2.subscribe((doc: any) => {
        console.log(doc.id, ' => ', doc.data());
        const Countryyy = {
          Country: doc.data().Country,
          Slug: doc.data().Slug,
          NewConfirmed: doc.data().NewConfirmed,
          TotalConfirmed: doc.data().TotalConfirmed,
          NewDeaths: doc.data().NewDeaths,
          TotalDeaths: doc.data().TotalDeaths,
          NewRecovered: doc.data().NewRecovered,
          TotalRecovered: doc.data().TotalRecovered,
          Date: doc.data().Date
          };
        this.country = Countryyy;
        console.log(this.country);
        if (typeof this.country === 'undefined'){
          this.apiService.getDataSummary()
              .subscribe(responseList => {
                this.data = responseList[0];
                let count;
                for (const value of this.data.Countries) {
                  if (value.Country === this.countryName){
                    count = value;
                    console.log(count);
                  }
                }
                const stringDate = count.Date.split('-');
                this.country = {
                  Country: count.Country,
                  Slug: count.Slug,
                  NewConfirmed: count.NewConfirmed,
                  TotalConfirmed: count.TotalConfirmed,
                  NewDeaths: count.NewDeaths,
                  TotalDeaths: count.TotalDeaths,
                  NewRecovered: count.NewRecovered,
                  TotalRecovered: count.TotalRecovered,
                  Date: stringDate[0] + stringDate[1] + stringDate[2].substring(0, 2)
                };
                console.log(this.country);
                this.pieChartData = [this.country.TotalDeaths, this.country.TotalRecovered,
                  (this.country.TotalConfirmed - this.country.TotalRecovered)];
              });
        }else{
             this.pieChartData = [this.country.TotalDeaths, this.country.TotalRecovered,
          (this.country.TotalConfirmed - this.country.TotalRecovered)];
        }

        } );

    console.log(this.country);

    const tmp =  this.newsService.getNews();
    tmp.subscribe((querySnapshot: any) => {
        querySnapshot.forEach((doc: any) => {
          // console.log(doc.id, ' => ', doc.data());
          const NewsData = {
            User: doc.data().user,
            Country: doc.data().country,
            Description: doc.data().description,
            Date: doc.data().date,
          };
          this.countryNews.push(NewsData);
        });
    });
    // console.log(tmp);
    // console.log(this.countryNews);

    // if (typeof this.country === 'undefined'){
    //   this.apiService.getDataSummary()
    //       .subscribe(responseList => {
    //         this.data = responseList[0];
    //         let count;
    //         for (const value of this.data.Countries) {
    //           if (value.Country === this.countryName){
    //             count = value;
    //             console.log(count);
    //           }
    //         }
    //         const stringDate = count.Date.split('-');
    //         this.country = {
    //           Country: count.Country,
    //           Slug: count.Slug,
    //           NewConfirmed: count.NewConfirmed,
    //           TotalConfirmed: count.TotalConfirmed,
    //           NewDeaths: count.NewDeaths,
    //           TotalDeaths: count.TotalDeaths,
    //           NewRecovered: count.NewRecovered,
    //           TotalRecovered: count.TotalRecovered,
    //           Date: stringDate[0] + stringDate[1] + stringDate[2].substring(0, 2)
    //         };
    //         console.log(this.country);
    //         this.pieChartData = [this.country.TotalDeaths, this.country.TotalRecovered,
    //           (this.country.TotalConfirmed - this.country.TotalRecovered)];
    //       });
    // }else{
    //      this.pieChartData = [this.country.TotalDeaths, this.country.TotalRecovered,
    //   (this.country.TotalConfirmed - this.country.TotalRecovered)];
    // }



    this.apiService.getData2(this.countryName)
    .subscribe(responseList => {
      this.data4 = responseList[0];
      this.data5 = responseList[1];
     // console.log(this.data5[0]);


      const dt = new Date();
      dt.setDate(dt.getDate() - 7);
      let dates = getDates(dt, new Date());
      dates.forEach((date) => {
        this.barChartLabels.push(date.getDate() + ' ' + months[date.getMonth()].substring(0, 3));
        // console.log(date.getDate() + ' ' + months[date.getMonth()]);
      });
      let j = 0, flag = 0;
      for (let i = 0; i < this.data4.length; i++) {
        if (i > 0  && this.data4[i].Date === this.data4[i - 1].Date){
          if (this.barChartData[0].data !== undefined && this.barChartData[1].data !== undefined
            && this.barChartData[2].data !== undefined){
            this.barChartData[0].data[j] += ((this.data4[i].Deaths));
            this.barChartData[1].data[j] += ((this.data4[i].Recovered) );
            this.barChartData[2].data[j] += ((this.data4[i].Confirmed ));
          }
        }else{
          this.barChartData[0]?.data?.push(this.data4[i].Deaths);
          this.barChartData[1]?.data?.push(this.data4[i].Recovered );
          this.barChartData[2]?.data?.push(this.data4[i].Confirmed);
          if (flag !== 0){
            j++;
          }
          else{
            flag = 1;
          }
         // console.log(this.barChartData[1].data);
        }
      }
      // console.log(this.barChartData);

      for (let i = 1; i <= 8; i++) {
        if (this.barChartData[0].data !== undefined && this.barChartData[1].data !== undefined
          && this.barChartData[2].data !== undefined && this.barChartData2[0].data !== undefined && this.barChartData2[1].data !== undefined
          && this.barChartData2[2].data !== undefined){
            this.barChartData2[0].data[i - 1] = ((this.barChartData[0]?.data[i] as number) - (this.barChartData[0]?.data[i - 1]as number)) ;
            this.barChartData2[1].data[i - 1] = ((this.barChartData[1]?.data[i] as number) - (this.barChartData[1]?.data[i - 1]as number)) ;
            this.barChartData2[2].data[i - 1] = ((this.barChartData[2]?.data[i] as number) - (this.barChartData[2]?.data[i - 1]as number)) ;
            // console.log(this.barChartData2[0]);
          }

      }


      j = 0;
      for (let i = 0; i < this.data5.length; i++) {
        if (i > 0  && this.data5[i].Date === this.data5[i - 1].Date){
          if (this.lineChartData[0].data !== undefined && this.lineChartData[1].data !== undefined
            && this.lineChartData[2].data !== undefined){
            this.lineChartData[0].data[j] += this.data5[i].Deaths ;
            this.lineChartData[1].data[j] += (this.data5[i].Recovered);
            this.lineChartData[2].data[j] += (this.data5[i].Confirmed);
          }
        }else{
           this.lineChartData[0].data?.push(this.data5[i].Deaths);
           this.lineChartData[1].data?.push(this.data5[i].Recovered);
           this.lineChartData[2].data?.push(this.data5[i].Confirmed);
           j++;
        }
      }
      const startDate = this.data5[0]?.Date;
      const startDateArr = startDate.split('-');
      dates = getDates(new Date(startDateArr[0], startDateArr[1], startDateArr[2].substring(0, 2)), new Date());
      dates.forEach((date) => {
        this.lineChartLabels.push(date.getDate() + ' ' + months[date.getMonth()].substring(0, 3));
        // console.log(date.getDate() + " " + months[date.getMonth()]);
      });
    });
  }


}


const getDates = function(startDate: Date, endDate: Date) {
  let dates = [], currentDate = startDate;
  const addDays = function(this: any, days: number) {
        const date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
      };
  while (currentDate <= endDate) {
    dates.push(currentDate);
    currentDate = addDays.call(currentDate, 1);
  }
  return dates;
};


const months = [ 'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December' ];
