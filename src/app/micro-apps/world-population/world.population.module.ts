import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from '@angular/material/table';
import {CdkTableModule} from '@angular/cdk/table';
import { RouterModule } from '@angular/router';
import { WorldPopulationTableViewComponent } from './table/world.population.tableView.component';
import { WorldPopulationRouting } from './world.population-routing.module';
import { MatInputModule } from "@angular/material/input";
import { MatSortModule } from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import { WorldPopulationService } from './services/world.population.service';
import {HttpClientModule} from "@angular/common/http"
@NgModule({
    declarations: [WorldPopulationTableViewComponent],
    imports: [WorldPopulationRouting,
        HttpClientModule,
         RouterModule, MatTableModule, CdkTableModule, MatIconModule, MatFormFieldModule,
          MatInputModule, MatSortModule, 
          MatPaginatorModule,
          FormsModule, CommonModule],
    exports: [RouterModule, WorldPopulationTableViewComponent],
    providers:[WorldPopulationService]
})
export class WorldPopulationModule { }