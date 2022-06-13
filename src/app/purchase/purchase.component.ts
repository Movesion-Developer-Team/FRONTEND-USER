import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { CheckoutComponent } from '../checkout/checkout.component';
import { DiscountBodyDto, GetAllDiscountsForPlayerResponseDto } from '../models/GetAllDiscountsForPlayerResponseDto';
import { BaseBody, GetCurrentUserInfoResponseDto } from '../models/GetCurrentUserInfoResponseDto';
import { StripeComponent } from '../stripe/stripe.component';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {
  paymentMethods!:FormGroup;

  paymentForm!: FormGroup;
  GetAllDiscountsForPlayerOfCompanyList!:DiscountBodyDto[]
  private currentNumber = 0;
  listdata!:BaseBody
name:string;
  playerId!: number  ;

  discountValue!: number;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,public dialogRef: MatDialogRef<PurchaseComponent>,private route: ActivatedRoute,private authService: AuthService,private http:HttpClient,private router:Router ,private fb : FormBuilder) { this.playerId = data.playerId;
    this.name=data.Name;
  this.discountValue=data.discountValue;
  }
 
  ngOnInit(): void {

    this.getCompanyId();
  }

quantity:number=1;

i=1;
plus(){
  if(this.i !=50)
  this.i++;
  this.quantity=this.i;
  this.discountValue=this.discountValue*this.i;
}


minus(){
if(this.i !=1)
this.i--;
this.quantity=this.i;
}
  onNoClick(): void {
    this.dialogRef.close();
  }






  getCompanyId(){

    var lon= this.route.snapshot.params['playersId'];
  
    this.http.get<GetCurrentUserInfoResponseDto>('https://localhost:7098/User/GetCurrentUserInfo').pipe(
      map(result => result.companyId)
    ).subscribe(
      data => {
        
      this.listdata = data

    
    
      // var lon= this.item.id;
  
      var lin=this.listdata.id;
  
    // console.log(lon,lin)
      this.http.get<GetAllDiscountsForPlayerResponseDto> ('https://localhost:7098/Discount/GetAllDiscountsForPlayerOfCompany?playerId=' + this.playerId + '&companyId='+lin).pipe(
        map(res => res.discounts)
      ).subscribe(res => {
       this.GetAllDiscountsForPlayerOfCompanyList = res
   
       console.log(this.GetAllDiscountsForPlayerOfCompanyList)
       
          console.log(this.name);
          console.log(this.discountValue)
        
      }
         
      );
  
  
  })

   }



gotoCheckout(){
  this.dialogRef.close();
  this.dialog.open(StripeComponent, {
    width: '560px',
    height:'300px',
 
    data: {
      
    },
    
  })


}



   onSubmit(): void {}
}
