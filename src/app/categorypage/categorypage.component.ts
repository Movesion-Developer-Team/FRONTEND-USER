import { HttpClient, HttpResponse } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { CategoryBodyDto, GetAllCategoriesResponseDto } from '../models/GetAllCategoriesResponseDto';
import {  HttpHeaders, HttpParams, } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseBody, GetCurrentUserInfoResponseDto } from '../models/GetCurrentUserInfoResponseDto';
import { AuthService } from '../_services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateNewCategoryBodyDto } from '../models/CreateNewCategoryBodyDto';
import { companyBodyDto } from '../models/companyBodyDto';
import { GetAllCategoriesForCompanyResponseDto } from '../models/GetAllCategoriesForCompanyResponseDto';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { companyId } from '../models/companyId';
import { GetAllPlayersForCurrentCompanyResponseDto, PlayerOnlyBodyDto } from '../models/GetAllPlayersForCurrentCompanyResponseDto';



@Component({
  selector: 'app-categorypage',
  templateUrl: './categorypage.component.html',
  styleUrls: ['./categorypage.component.css']
})
export class CategorypageComponent implements OnInit {
  // listdata!:GetCurrentUserInfoResponseDto[];
listdata!:BaseBody;
term!: string;
assigned=false
notassigned=true
invitationForm!:FormGroup
listinfo!:CategoryBodyDto[];

searchText!: string;
listcategory!:CreateNewCategoryBodyDto[];
//  companyId: number | undefined ;

search!:FormGroup
searchList!: PlayerOnlyBodyDto[];
playerShow= true;
  constructor(private fb : FormBuilder,private authService: AuthService,private http:HttpClient,private router:Router) { 
  this.invitationForm=this.fb.group({
     invitation:['',Validators.required],

  })




  this.search = this.fb.group({
    playerName:['',Validators.required],
  })

}


  ngOnInit(): void {
    this.http.get<GetCurrentUserInfoResponseDto>('https://localhost:7098/User/GetCurrentUserInfo').pipe(
      map(result => result.companyId)
    ).subscribe({
      next: data => {
      this.listdata = data;
      this.assigned=true;
     // this.router.navigateByUrl('/home')
     this.notassigned=false;
     console.log(this.listdata);
   },
  error: err => {
    alert('the user is not assigned to the company please register to the company:');
   return of (null);
  }
  })

  

 

  this.getcategory()



  }



gohere(){
  this.router.navigateByUrl('/home');
  console.log(this.listdata);
}


getcategory(){
this.http.get<GetAllCategoriesForCompanyResponseDto>('https://localhost:7098/Category/GetAllCategoriesForCurrentCompany').pipe(
  map(result => result.categories)
).subscribe({
  next: data => {
  this.listinfo = data; 
  console.log
},

})

  }

 

  gotoplayer(item:CategoryBodyDto){
console.log(item.id);





  }



submit(){




var name=this.search.get('playerName')?.value;
console.log(name)

 this.http.get<GetAllPlayersForCurrentCompanyResponseDto>('https://localhost:7098/Company/SearchForPlayerOfCompany?playerName='+name).pipe(
  map(result=>result.players)
 ).subscribe({
  next:data=>{
  this.searchList=data;
  this.playerShow=false;
  console.log(data)
  }
 })



  console.log('salam')
}



}
