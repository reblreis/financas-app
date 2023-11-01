import { Routes, RouterModule } from '@angular/router'; 
import { LoginComponent } from './components/pages/login/login.component'; 
import { NgModule } from '@angular/core';

const routes: Routes = [
    {
        path: 'pages/login', 
        component: LoginComponent,
    },
    {
        path: '', 
        pathMatch: 'full', 
        redirectTo: '/pages/login',
    }, 
]; 

@NgModule({ 
    imports: [RouterModule.forRoot(routes)], 
    exports: [RouterModule], 
}) 
export class RoutingModule {}