import { PartModule } from './part/part.module';
import { ManufacturerModule } from './manufacturer/manufacturer.module';
import { CustomerModule } from './customer/customer.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';

import { SharedModule } from './shared/shared.module';
import { UsersFormModule } from './users-form/users-form.module';
import { ProductModule } from './product/product.module';
import { ChartCardModule } from './chart-card/chart-card.module';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { RequestModule } from './request/request.module';
import { CustomDialogComponent } from './custom-dialog/custom-dialog.component';
import { AngularFireAuth } from 'angularfire2/auth';

export const firebaseConfig = environment.firebaseConfig;

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    MenuComponent,
    HomeComponent,
    CustomDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    ChartCardModule,
    ProductModule,
    UsersFormModule,
    CustomerModule,
    PartModule,
    RequestModule,
    ManufacturerModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(firebaseConfig),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [AuthService, AuthGuard, AngularFireAuth],
  bootstrap: [AppComponent],
  entryComponents: [CustomDialogComponent]
})
export class AppModule { }
