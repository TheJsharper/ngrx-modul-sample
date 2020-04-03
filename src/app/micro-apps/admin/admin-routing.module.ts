import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin-apps/admin.component';

const adminRoutes: Routes = [
    {
        path:'',
        component: AdminComponent,
        children:[
            {
                path:'',
                children:[
                    {}, // first component
                    {} // secound component
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