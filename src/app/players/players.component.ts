import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, NumberValueAccessor } from '@angular/forms';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { map } from 'rxjs';
import { BaseResponse } from '../models/BaseResponse';
import { CreateNewCategoryBodyDto } from '../models/CreateNewCategoryBodyDto';
import { GetAllCategoriesForCompanyResponseDto } from '../models/GetAllCategoriesForCompanyResponseDto';
import { CategoryBodyDto } from '../models/GetAllCategoriesResponseDto';
import { GetAllPlayersForCurrentCompanyResponseDto, PlayerOnlyBodyDto } from '../models/GetAllPlayersForCurrentCompanyResponseDto';
import { GetAllPlayersResponseDto, PlayerBodyDto } from '../models/GetAllPlayersResponseDto';
import { AuthService } from '../_services/auth.service';

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
  constructor( private authService: AuthService,private http:HttpClient,private router:Router ,private route: ActivatedRoute) {


  
 
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
      map(result => result.players)
    ).subscribe({
      next: data => {
      this.listinfo = data; 
     
     
  this.http.get<BaseResponse>('https://localhost:7098/Player/GetImageOfPlayer?PlayerId=1').subscribe(data=>{

  this.getImage=data;
  console.log(this.getImage);
  }
  )
    
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