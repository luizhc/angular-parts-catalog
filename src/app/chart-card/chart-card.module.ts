
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

import { ChartCardComponent } from './chart-card/chart-card.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule
  ],
  declarations: [
    ChartCardComponent
  ],
  exports: [
    ChartCardComponent
  ]
})
export class ChartCardModule { }
