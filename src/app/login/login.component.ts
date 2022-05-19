import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { GetCurrentUserInfoResponseDto } from '../models/GetCurrentUserInfoResponseDto';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null,
    companyId:null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

afterlogin: boolean = false;
  listdata!:any




  constructor(private authService: AuthService, private tokenStorage: TokenStorageService,private http:HttpClient) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
    
    // this.http.get<GetCurrentUserInfoResponseDto>('https://localhost:7098/Auth/GetCurrentUserInfo').pipe(
     
    //   map(result => result.companyId)
    // ).pipe(
    //   catchError(er=> {
    //     alert('User not assigned to the company please join the company');
    //     return of (null);
    //   })
    // )
    
    // .subscribe((data) => {
    //   this.listdata = data;
   
    // });
    
   
   
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe({
      next: data => {
        // this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.afterlogin= true;
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.reloadPage();
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }
}
