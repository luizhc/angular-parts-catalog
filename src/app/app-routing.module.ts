import { ManufacturerComponent } from './manufacturer/manufacturer.component';
import { PartComponent } from './part/part.component';
import { CustomerComponent } from './customer/customer.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from 'src/app/home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PartsFormComponent } from './parts-form/parts-form.component';
import { UsersFormComponent } from 'src/app/users-form/users-form.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'parts-form', component: PartsFormComponent },
  { path: 'users-form', component: UsersFormComponent },
  { path: 'customers', component: CustomerComponent },
  { path: 'parts', component: PartComponent },
  { path: 'manufacturers', component: ManufacturerComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
