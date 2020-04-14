import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path:'',
    loadChildren: ()=> import('./micro-apps/admin/admin.module').then(m => m.AdminModule)
  },
  { path: 'population',  loadChildren: ()=> import('./micro-apps/world-population/world.population.module').then(m => m.WorldPopulationModule) },
  { path: 'charts',  loadChildren: ()=> import('./micro-apps/world-population-charts/world.population.charts.module').then(m => m.WorldPopulationChartsModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
