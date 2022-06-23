import { HttpClient, HttpResponse } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';
import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, concatMap, distinctUntilChanged, map, of, Subject, switchMap, tap, toArray } from 'rxjs';
import { CategoryBodyDto, GetAllCategoriesResponseDto } from '../models/GetAllCategoriesResponseDto';
import {  HttpHeaders, HttpParams, } from '@angular/common/http';

import { BaseBody, GetCurrentUserInfoResponseDto } from '../models/GetCurrentUserInfoResponseDto';
import { AuthService } from '../_services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateNewCategoryBodyDto } from '../models/CreateNewCategoryBodyDto';
import { companyBodyDto } from '../models/companyBodyDto';
import { GetAllCategoriesForCompanyResponseDto } from '../models/GetAllCategoriesForCompanyResponseDto';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { companyId } from '../models/companyId';
import { GetAllPlayersForCurrentCompanyResponseDto, PlayerOnlyBodyDto } from '../models/GetAllPlayersForCurrentCompanyResponseDto';
import {debounceTime, startWith} from 'rxjs/operators';


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
playerShow= false;


listsOfItems :{name: string, url: string ,id:number }[] = [];

@Input() initialValue: string = '';
  @Input() debounceTime = 300;

  @Output() textChange = new EventEmitter<string>();

  inputValue = new Subject<string>();
  trigger = this.inputValue.pipe(
    debounceTime(this.debounceTime),
    distinctUntilChanged()
  );



  constructor(private fb : FormBuilder,private authService: AuthService,private http:HttpClient,private router:Router) { 
  this.invitationForm=this.fb.group({
     invitation:['',Validators.required],

  })




  this.search = this.fb.group({
    playerName:['',Validators.required],
  })

  this.search.valueChanges.pipe(
    startWith({playerName:''}),
    debounceTime(500),
    distinctUntilChanged(),
    switchMap(term => {
      if (!term || !term.playerName || term.playerName.length <= 0) {
        return of(this.listinfo.map(x => ({ name: x.name, url: `/players/${x.id}/${x.name}`,id: x.id })));
      }
      if (this.listinfo){
        const filtered = this.listinfo.filter(x => x.name.toLowerCase().includes(term.playerName.toLowerCase()));
        if (filtered.length > 0) {
          return of(filtered.map(x => ({ name: x.name, url: `/players/${x.id}/${x.name}`,id: x.id})));
        }
      }
      return this.http.get<GetAllPlayersForCurrentCompanyResponseDto>(`https://localhost:7098/Company/SearchForPlayerOfCompany?playerName=${term.playerName}`)
      .pipe(
        map(result => result.players.map(x => ({ name: x.shortName, url: `/vouchers/${x.id}/${x.shortName}`,id: x.id })))
      )
    })
  ).subscribe((result)=>{
    console.log(result);
this.listsOfItems= result; 
  });

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
  
}


getcategory(){
this.http.get<GetAllCategoriesForCompanyResponseDto>('https://localhost:7098/Category/GetAllCategoriesForCurrentCompany').pipe(
  map(result => result.categories)
).subscribe({
  next: data => {
  this.listinfo = data; 
  // this.playerShow = true;

},

})

  }

 

  gotoplayer(item:CategoryBodyDto){





  }
  


// searchPlayer() {

// var name=this.search.get('playerName')?.value;
// console.log(name)
//  this.http.get<GetAllPlayersForCurrentCompanyResponseDto>('https://localhost:7098/Company/SearchForPlayerOfCompany?playerName='+name).pipe(
//   map(result=>result.players)
//  ).subscribe({
//   next:data=>{
//   this.searchList=data;
//   this.playerShow=true;
//   this.listinfo===this.listinfo!;
//   console.log(data)


//   }
//  })

 
// }



}
