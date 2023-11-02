import { Routes, RouterModule } from '@angular/router'; 
import { LoginComponent } from './components/pages/login/login.component'; 
import { NgModule } from '@angular/core';
import { RegisterComponent } from './components/pages/register/register.component';
import { CreateComponent } from './components/admin/create/create.component'; 
import { ListComponent } from './components/admin/list/list.component'; 
import { EditComponent } from './components/admin/edit/edit.component'; 
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
    {
        path: 'pages/login', 
        component: LoginComponent,
    },
    { 
        path: 'pages/register', 
        component: RegisterComponent, 
    }, 
    { 
        path: 'admin/create', 
        component: CreateComponent,
        canActivate: [AdminGuard] 
    }, 
    { 
        path: 'admin/list', 
        component: ListComponent,
        canActivate: [AdminGuard] 
    }, 
    { 
        path: 'admin/edit/:id', 
        component: EditComponent,
        canActivate: [AdminGuard] 
    }, 
    { 
        path: 'admin/dashboard', 
        component: DashboardComponent,
        canActivate: [AdminGuard] 
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