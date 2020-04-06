import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { WorldPopulationTableViewComponent } from './table/world.population.tableView.component';
const worlPopulationRoutes: Routes = [
    {
        path:'',
        component: WorldPopulationTableViewComponent,
        /*children:[
            {
                path:'',
                children:[
                    {path:'admin-dashboard', component: AdminDashboardComponent}, // first component
                   // {}  secound component
                ]
            }
        ]*/
        
    }
]


@NgModule({
    imports: [RouterModule.forChild(worlPopulationRoutes)],
    exports: [RouterModule]
})
export class WorldPopulationRouting{}