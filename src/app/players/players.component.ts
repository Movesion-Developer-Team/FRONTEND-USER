import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, NumberValueAccessor } from '@angular/forms';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { catchError, concatMap, map, of, switchMap, tap, toArray } from 'rxjs';
import { BaseResponse } from '../models/BaseResponse';
import { CreateNewCategoryBodyDto } from '../models/CreateNewCategoryBodyDto';
import { GetAllCategoriesForCompanyResponseDto } from '../models/GetAllCategoriesForCompanyResponseDto';
import { CategoryBodyDto } from '../models/GetAllCategoriesResponseDto';
import { GetAllPlayersForCurrentCompanyResponseDto, PlayerOnlyBodyDto } from '../models/GetAllPlayersForCurrentCompanyResponseDto';
import { GetAllPlayersResponseDto, PlayerBodyDto } from '../models/GetAllPlayersResponseDto';
import { AuthService } from '../_services/auth.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})






export class PlayersComponent implements OnInit {
  public parameterValue!: string;
  listinfo!:PlayerBodyDto[];
  listcategory!:CreateNewCategoryBodyDto[];
  id!: number|undefined;
  term!: string;
  searchTerm!: string;
  searchText!: string;
  search!:FormGroup;
  searchList!: PlayerOnlyBodyDto[];
  getImage!:any
  constructor( 
    private sanitizer : DomSanitizer ,
    private authService: AuthService,private http:HttpClient,private router:Router ,private route: ActivatedRoute) {


  
 
  }

  ngOnInit(): void {

    this.route.params.subscribe(parameter => {
    this.parameterValue = parameter['categoryName']
      
      
    })

  

    let categoryId= this.route.snapshot.params['categoryId'];
    let categoryName= this.route.snapshot.params['categoryName'];
//     let categoryName = this.route.snapshot.params['categoryName']
// console.log(categoryName)

    this.http.get<GetAllPlayersResponseDto>('https://localhost:7098/Category/GetAllPlayersForCurrentCategory?categoryId='+ categoryId).pipe(
      map(result => result.players),
      // tap(result => {
      //   this.listinfo = result; 
      // }),
      switchMap(result => result),
      concatMap(player => this.http.get(`https://localhost:7098/Player/GetImageOfPlayer?PlayerId=${player.id}`,{ 
        responseType: 'blob',
        headers: {
    
        }
      }).pipe(
        tap(image=>{
          player.tempImage = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(image));
        }),
        catchError(error=>{
          return of (player);
        }),
        map(image=> player)

      )
      
      ),
      toArray()
    ).subscribe({
      next: data => {
      
        this.listinfo = data; 
  // this.http.get('https://localhost:7098/Player/GetImageOfPlayer?PlayerId=1',{ 
  //   responseType: 'blob',
  //   headers: {

  //   }
  // })
  // .pipe(
  //   catchError(
  //         (error) => {console.error(error); 
  //     throw error;}
  //     )).subscribe((data: any)=>{
  //       // let blob = new Blob([response] );
  //       this.getImage = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(data));

  //this.getImage=window.URL.createObjectURL(data); ;
  // console.log(this.getImage);
  // }
  // )
    
     var sal= this.listinfo[0];
     var sali= sal.image;
     var salivan= sali.content;
     console.log(salivan);
     
  

    },
 







    
    })
 
   


    // var bytes = [salivan]; 
    // var uints = new Uint8Array(bytes);
    // var base64 = btoa(String.fromCharCode(null, uints));
    // var url = 'data:image/jpeg;base64,' + base64;

 

  }


  gohere(){
    this.router.navigateByUrl('/categorypage');
    
  }



  submit(){




    // var name=this.search.get('playerName')?.value;
    // console.log(name)
    
    //  this.http.get<GetAllPlayersForCurrentCompanyResponseDto>('https://localhost:7098/Company/SearchForPlayerOfCompany?playerName='+name).pipe(
    //   map(result=>result.players)
    //  ).subscribe({
    //   next:data=>{
    //   this.searchList=data;
     
    //   console.log(data)
    //   }
    //  })
    
    
    
     
    // }




}


}