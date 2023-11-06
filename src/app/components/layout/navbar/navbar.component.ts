import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { NgxSpinnerService } from 'ngx-spinner';
import { getUserLogin, isUserAuthenticated, logout } from 'src/app/helpers/authentication.helper';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isAuthenticated: boolean = false; 
  nomeUsuario: string = ''; 
  
  constructor( 
    private spinnerService: NgxSpinnerService, 
    private router: Router 
  ) {} 
  
  ngOnInit(): void { 
    this.isAuthenticated = isUserAuthenticated(); 
    if(this.isAuthenticated) { 
      this.nomeUsuario = getUserLogin()?.nome as string; 
    } 
  } 
  
  sair() { 
    if(window.confirm('Deseja realmente sair do sistema?')) { 
      this.spinnerService.show(); 
      logout(); //logout do usuário! 
      this.router.navigate(['/pages/login']) 
        .then(() => { 
          window.location.reload(); 
        }); 
      } 
    }
}