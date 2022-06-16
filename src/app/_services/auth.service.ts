import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthInterceptor } from '../_helpers/auth.interceptor';

import { FormBuilder } from '@angular/forms';
import { IdentityUserDto } from '../models/register.model';
import { LoginBodyDto } from '../models/loginBodyDto';
import { CategoryBodyDto, GetAllCategoriesResponseDto } from '../models/GetAllCategoriesResponseDto';
import { GetCurrentUserInfoResponseDto } from '../models/GetCurrentUserInfoResponseDto';
import { GetTotalAmountResponseDto } from '../models/GetTotalAmountResponseDto';



const AUTH_API = 'https://localhost:7098/Auth/';

const Company_API='https://localhost:7098/'

const Company_Delete='https://localhost:7098/Company/'

const Company_Category= 'https://localhost:7098/Category/'

const Player_Delete = 'https://localhost:7098/Player/'

let httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
listData!:CategoryBodyDto[];
 
  constructor(public http: HttpClient, private fb : FormBuilder) { }

  login(UserName: string, Password: string, 
  ): Observable<LoginBodyDto> {
    return this.http.post<LoginBodyDto>(AUTH_API + 'Login', {
       UserName,
       Password,
       
    }, httpOptions);
  }

  Register(userName: string, password: string): Observable<IdentityUserDto> {
    return this.http.post<IdentityUserDto> (AUTH_API + 'Register/', {
       userName,
       password,
    
      
    }, httpOptions);
  }
  




Purchase(discountId:number,quantity:number): Observable<GetTotalAmountResponseDto>{

  return this.http.post<GetTotalAmountResponseDto>('https://localhost:7098/Purchase/GetTotalAmount?discountId=' + discountId ,'&quantity='+ quantity ,httpOptions)
  
}







  getcategory (){

  }
  GetCurrentUserInfo(){
    this.http.get<GetAllCategoriesResponseDto>('https://localhost:7098/User/GetAll').pipe(
      map(res => res.categories)
    ).subscribe(res => {
      this.listData = res;
    })
  }


}