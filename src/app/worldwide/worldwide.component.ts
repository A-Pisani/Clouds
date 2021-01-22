import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {ApiService} from '../api.service';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';
import { NewsService } from '../news.service';
import { News } from 'src/news.model';
import { User } from 'src/user.model';

@Component({
  selector: 'app-worldwide',
  templateUrl: './worldwide.component.html',
  styleUrls: ['./worldwide.component.css']
})
export class WorldwideComponent implements OnInit {
  worldNews: Array<News> = [];
  user: User | undefined;


  constructor(public apiService: ApiService, public newsService: NewsService){}

  public data!: any;
  data2!: any;
  data3!: any;



  title = 'COVID19';

  // Pie
    public pieChartOptions: ChartOptions = {
      responsive: true,
    };
    public pieChartLabels: Label[] = ['Dead Cases', 'Recovered Cases', 'Active Cases'];
    public pieChartData: SingleDataSet = [300, 500, 100];
    public pieChartType: ChartType = 'pie';
    public pieChartLegend = true;
    public pieChartPlugins = [];

    public lineChartData: ChartDataSets[] = [
        { data: [], label: 'Total Deaths' },
        { data: [], label: 'Total Recovered' },
        { data: [], label: 'Total Cases'}
      ];
    public lineChartLabels: Label[] = [];
    public lineChartLegend = true;
    public lineChartType: ChartType = 'line';

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

    public ascNumberSort = true;

    sortStringColumn(flag: boolean)  {
          if (flag) {
              this.data?.Countries?.sort((a: { Country: string; }, b: { Country: string; }) => (a.Country > b.Country) ? 1 : ((b.Country > a.Country) ? -1 : 0)); // For ascending sort
          } else {
            this.data?.Countries?.sort((a: { Country: string; }, b: { Country: string; }) => (a.Country > b.Country) ? -1 : ((b.Country > a.Country) ? 1 : 0)); // For ascending sort
          }
      }

      sortNumberColumn(flag: boolean, numberSort: number)  {
        if (flag) {
          switch (numberSort) {
            case 1: {
              this.data?.Countries?.sort((a: { NewConfirmed: string; }, b: { NewConfirmed: string; }) => (a.NewConfirmed > b.NewConfirmed) ? 1 : ((b.NewConfirmed > a.NewConfirmed) ? -1 : 0)); // For ascending sort
              break;
            }
            case 2: {
              this.data?.Countries?.sort((a: { TotalConfirmed: string; }, b: { TotalConfirmed: string; }) => (a.TotalConfirmed > b.TotalConfirmed) ? 1 : ((b.TotalConfirmed > a.TotalConfirmed) ? -1 : 0)); // For ascending sort
              break;
            }
            case 3: {
              this.data?.Countries?.sort((a: { NewRecovered: string; }, b: { NewRecovered: string; }) => (a.NewRecovered > b.NewRecovered) ? 1 : ((b.NewRecovered > a.NewRecovered) ? -1 : 0)); // For ascending sort
              break;
            }
            case 4: {
              this.data?.Countries?.sort((a: { TotalRecovered: string; }, b: { TotalRecovered: string; }) => (a.TotalRecovered > b.TotalRecovered) ? 1 : ((b.TotalRecovered > a.TotalRecovered) ? -1 : 0)); // For ascending sort
              break;
            }
            case 5: {
              this.data?.Countries?.sort((a: { NewDeaths: string; }, b: { NewDeaths: string; }) => (a.NewDeaths > b.NewDeaths) ? 1 : ((b.NewDeaths > a.NewDeaths) ? -1 : 0)); // For ascending sort
              break;
            }
            case 6: {
              this.data?.Countries?.sort((a: { TotalDeaths: string; }, b: { TotalDeaths: string; }) => (a.TotalDeaths > b.TotalDeaths) ? 1 : ((b.TotalDeaths > a.TotalDeaths) ? -1 : 0)); // For ascending sort
              break;
            }
            default: break;
         }
        } else {
          switch (numberSort) {
          case 1: {
            this.data?.Countries?.sort((a: { NewConfirmed: string; }, b: { NewConfirmed: string; }) => (a.NewConfirmed > b.NewConfirmed) ? -1 : ((b.NewConfirmed > a.NewConfirmed) ? 1 : 0)); // For ascending sort
            break;
          }
          case 2: {
            this.data?.Countries?.sort((a: { TotalConfirmed: string; }, b: { TotalConfirmed: string; }) => (a.TotalConfirmed > b.TotalConfirmed) ? -1 : ((b.TotalConfirmed > a.TotalConfirmed) ? 1 : 0)); // For ascending sort
            break;
          }
          case 3: {
            this.data?.Countries?.sort((a: { NewRecovered: string; }, b: { NewRecovered: string; }) => (a.NewRecovered > b.NewRecovered) ? -1 : ((b.NewRecovered > a.NewRecovered) ? 1 : 0)); // For ascending sort
            break;
          }
          case 4: {
            this.data?.Countries?.sort((a: { TotalRecovered: string; }, b: { TotalRecovered: string; }) => (a.TotalRecovered > b.TotalRecovered) ? -1 : ((b.TotalRecovered > a.TotalRecovered) ? 1 : 0)); // For ascending sort
            break;
          }
          case 5: {
            this.data?.Countries?.sort((a: { NewDeaths: string; }, b: { NewDeaths: string; }) => (a.NewDeaths > b.NewDeaths) ? -1 : ((b.NewDeaths > a.NewDeaths) ? 1 : 0)); // For ascending sort
            break;
          }
          case 6: {
            this.data?.Countries?.sort((a: { TotalDeaths: string; }, b: { TotalDeaths: string; }) => (a.TotalDeaths > b.TotalDeaths) ? -1 : ((b.TotalDeaths > a.TotalDeaths) ? 1 : 0)); // For ascending sort
            break;
          }
          default: break;
       }
        }
    }




  ngOnInit(): void{
    this.user = this.newsService.getUser();
    this.apiService.getData()
          .subscribe(responseList => {
            this.data = responseList[0];
            this.data2 = responseList[1];
            this.data3 = responseList[2];
            // this.data3.sort((a: { TotalConfirmed: number; }, b: { TotalConfirmed: number; }) => -b.TotalConfirmed + a.TotalConfirmed);

            // console.log(this.data2);

            this.pieChartData = [this.data?.Global?.TotalDeaths, this.data?.Global?.TotalRecovered,
              (this.data?.Global?.TotalConfirmed - this.data?.Global?.TotalRecovered)];
            // console.log(this.lineChartData[0].data);

          /*   for (let i = 0; i < this.data3.length; i++) {
              this.lineChartData[0].data?.push(this.data3[i].TotalDeaths);
              this.lineChartData[1].data?.push(this.data3[i].TotalRecovered);
              this.lineChartData[2].data?.push(this.data3[i].TotalConfirmed);
             // console.log(this.data3[i]);
            } */
            this.lineChartLabels = (Object.keys(this.data3.deaths));
            let val: any;
            for (  val of Object.values(this.data3.deaths)){
              this.lineChartData[0].data?.push(val);
            }
            for (  val of Object.values(this.data3.cases)){
              this.lineChartData[1].data?.push(val);
            }
            for (  val of Object.values(this.data3.recovered)){
              this.lineChartData[2].data?.push(val);
            }


            console.log(this.lineChartLabels);

            // const dt = new Date();
            // dt.setDate(dt.getDate() - 6);
            // const dates = getDates(dt, new Date());
            // dates.forEach((date) => {
            //   this.barChartLabels.push(date.getDate() + ' ' + months[date.getMonth()].substring(0, 3));
            //   console.log(date.getDate() + ' ' + months[date.getMonth()]);
            // });

            /* for (let i = 0; i < this.data2.length; i++) {
              this.barChartData[0]?.data?.push(this.data2[i].NewDeaths);
              this.barChartData[1]?.data?.push(this.data2[i].NewRecovered);
              this.barChartData[2]?.data?.push(this.data2[i].NewConfirmed);
              console.log(this.barChartData);
            } */
            const i = 0;
            for (let i = 0; i < Object.values(this.data2.deaths).length; i++){
              if (i > 0){
                 this.barChartData[0].data?.push((Object.values(this.data2.deaths)[i] as number) - (Object.values(this.data2.deaths)[i - 1] as number));
                 this.barChartLabels.push(Object.keys(this.data2.deaths)[i] as Label);
              }
            }

            for (let i = 0; i < Object.values(this.data2.recovered).length; i++){
              if (i > 0){
                 this.barChartData[1].data?.push((Object.values(this.data2.recovered)[i] as number) - (Object.values(this.data2.recovered)[i - 1] as number));
              }
            }

            for (let i = 0; i < Object.values(this.data2.cases).length; i++){
              if (i > 0){
                 this.barChartData[2].data?.push((Object.values(this.data2.cases)[i] as number) - (Object.values(this.data2.cases)[i - 1] as number));
              }
            }



           /*  for (  val of Object.values(this.data2.recovered)){
              this.barChartData[1].data?.push(val);
            }
            for (  val of Object.values(this.data2.cases)){
              this.barChartData[2].data?.push(val);
            } */
            console.log(this.barChartData);
            // console.log(this.lineChar

          /*   dates = getDates(new Date(2020, 3, 13), new Date());
            dates.forEach((date) => {
              this.lineChartLabels.push(date.getDate() + ' ' + months[date.getMonth()].substring(0, 3));
              // console.log(date.getDate() + " " + months[date.getMonth()]);
            }); */


          });
    const tmp =  this.newsService.getNews();
    tmp.subscribe((querySnapshot: any) => {
        console.log(querySnapshot);
        querySnapshot.forEach((doc: any) => {
          console.log(doc.id, ' => ', doc.data());
          const NewsData = {
            User: doc.data().user,
            Country: doc.data().country,
            Description: doc.data().description,
            Date: doc.data().date,
          };
          // this.worldNews.push(doc.data());
          this.worldNews.push(NewsData);
        });
    });
    console.log(tmp);

    console.log(this.worldNews);
    }


  }

const getDates = function(startDate: Date, endDate: Date) {
    let dates = [],
        currentDate = startDate,
        addDays = function(this: any, days: number) {
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




