import { ManufacturerComponent } from './manufacturer/manufacturer.component';
import { PartComponent } from './part/part.component';
import { CustomerComponent } from './customer/customer.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from 'src/app/home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductComponent } from './product/product.component';
import { UsersFormComponent } from 'src/app/users-form/users-form.component';
import { RequestComponent } from './request/request.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'product', component: ProductComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: HomeComponent },
  { path: 'users-form', component: UsersFormComponent, canActivate: [AuthGuard] },
  { path: 'customers', component: CustomerComponent },
  { path: 'parts', component: PartComponent, canActivate: [AuthGuard] },
  { path: 'manufacturers', component: ManufacturerComponent, canActivate: [AuthGuard] },
  { path: 'request', component: RequestComponent, canActivate: [AuthGuard] },
  { path: 'request/:id', component: RequestComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
