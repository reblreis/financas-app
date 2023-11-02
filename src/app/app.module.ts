import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { NgxSpinnerModule } from 'ngx-spinner';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RoutingModule } from './app.routing';
import { MaterialModules } from './app.material';
import { RegisterComponent } from './components/pages/register/register.component';
import { CreateComponent } from './components/admin/create/create.component';
import { ListComponent } from './components/admin/list/list.component';
import { EditComponent } from './components/admin/edit/edit.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { MessagesComponent } from './components/layout/messages/messages.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    CreateComponent,
    ListComponent,
    EditComponent,
    DashboardComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    MaterialModules,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, 
    NgxSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }