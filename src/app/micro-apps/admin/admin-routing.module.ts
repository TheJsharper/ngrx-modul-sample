import { NgModule, Component } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin-apps/admin.component';
import { AdminDashboardComponent } from './dashboard/admin-dashboard.component';

const adminRoutes: Routes = [
    {
        path:'',
        component: AdminComponent,
        children:[
            {
                path:'',
                children:[
                    {path:'admin-dashboard', component: AdminDashboardComponent}, // first component
                   // {}  secound component
                ]
            }
        ]
        
    }
]


@NgModule({
    imports: [RouterModule.forChild(adminRoutes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }