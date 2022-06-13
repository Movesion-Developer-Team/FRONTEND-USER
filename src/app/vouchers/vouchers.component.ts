import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';

import { companyId } from '../models/companyId';
import { DiscountBodyDto, GetAllDiscountsForPlayerResponseDto } from '../models/GetAllDiscountsForPlayerResponseDto';
import { GetAllPlayersResponseDto, PlayerBodyDto } from '../models/GetAllPlayersResponseDto';
import { BaseBody, GetCurrentUserInfoResponseDto } from '../models/GetCurrentUserInfoResponseDto';
import { PurchaseComponent } from '../purchase/purchase.component';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-vouchers',
  templateUrl: './vouchers.component.html',
  styleUrls: ['./vouchers.component.css']
})
export class VouchersComponent implements OnInit {
  term!: string;
  GetAllDiscountsForPlayerOfCompanyList!:DiscountBodyDto[];
  listinfo!:PlayerBodyDto[];
listdata!:BaseBody
data!:number ;
// salar:number[] = []
   


  constructor(private dialog: MatDialog,private authService: AuthService,private http:HttpClient,private router:Router ,private route: ActivatedRoute,private fb : FormBuilder) {
 



   }

  ngOnInit(): void {
    this.getCompanyId();
    
  }




getCompanyId(){

  var lon= this.route.snapshot.params['playersId'];

  this.http.get<GetCurrentUserInfoResponseDto>('https://localhost:7098/User/GetCurrentUserInfo').pipe(
    map(result => result.companyId)
  ).subscribe(
    data => {
      
    this.listdata = data
    console.log(this.listdata.id)
  
  
    var lon= this.route.snapshot.params['playersId'];

    var lin=this.listdata.id;

  console.log(lon,lin)
    this.http.get<GetAllDiscountsForPlayerResponseDto> ('https://localhost:7098/Discount/GetAllDiscountsForPlayerOfCompany?playerId=' + lon + '&companyId='+lin).pipe(
      map(res => res.discounts)
    ).subscribe(res => {
     this.GetAllDiscountsForPlayerOfCompanyList = res
 
    console.log(this.GetAllDiscountsForPlayerOfCompanyList)
     
  
      
    }
       
    );


})







    
    
 
   
  



 }




 onClickForm(item: DiscountBodyDto){
  this.dialog.open(PurchaseComponent, {
    width: '620px',
    height:'92%',
 
    data: {
      playerId:item.playerId,
      discountValue:item.discountValue,
      Name:item.name
    },
    panelClass: 'modalBox',
  })


}

}

