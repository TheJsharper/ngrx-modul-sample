import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
    imports:[RouterModule, AdminRoutingModule],
    exports:[RouterModule]
})
export class AdminModule{

}