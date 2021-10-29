import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { WorldPopulationInitService } from './services/world.population.init.service';
import { WorldPopulationService } from './services/world.population.service';
import { WorldPopulationTableViewComponent } from './table/world.population.tableView.component';
import { WorldPopulationRouting } from './world.population-routing.module';

@NgModule({
    declarations: [WorldPopulationTableViewComponent],
    imports: [WorldPopulationRouting,
        HttpClientModule,
         RouterModule, MatTableModule, CdkTableModule, MatIconModule, MatFormFieldModule,
          MatInputModule, MatSortModule, 
          MatPaginatorModule,
          FormsModule,
        CommonModule
    ],
    exports: [RouterModule, WorldPopulationTableViewComponent],
    providers:[ WorldPopulationService, WorldPopulationInitService]
})
export class WorldPopulationModule { }