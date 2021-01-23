import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CountryComponent } from './country/country.component';
import { NewsComponent } from './news/news.component';
import { SecurePagesGuard } from './secure-pages.guard';
import { SigninComponent } from './signin/signin.component';
import { WorldwideComponent } from './worldwide/worldwide.component';

const routes: Routes = [
  {path: "signin", component: SigninComponent, canActivate: [SecurePagesGuard]},
  {path: "worldwide", component: WorldwideComponent}, //see how it's called...
  {path: "country/:countryN", component: CountryComponent},
  {path: "index.html", component: WorldwideComponent},
  {path: "news", component: NewsComponent, canActivate: [AuthGuard]}, //see how it's called...
  {path: "", pathMatch: "full", redirectTo: "worldwide"},
  {path: "**", redirectTo: "worldwide"} // 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
