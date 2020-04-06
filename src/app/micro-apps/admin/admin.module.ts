import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './dashboard/admin-dashboard.component';
import { AdminComponent } from './admin-apps/admin.component';


@NgModule({
    declarations: [AdminDashboardComponent, AdminComponent],
    imports: [AdminRoutingModule, RouterModule],
    exports: [RouterModule, AdminDashboardComponent]
})
export class AdminModule {

}