import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NumberValueAccessor } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { CheckoutComponent } from '../checkout/checkout.component';
import { DiscountBodyDto, GetAllDiscountsForPlayerResponseDto } from '../models/GetAllDiscountsForPlayerResponseDto';
import { BaseBody, GetCurrentUserInfoResponseDto } from '../models/GetCurrentUserInfoResponseDto';
import { GetTotalAmountResponseDto } from '../models/GetTotalAmountResponseDto';
import { PaymentIntentResponseDto } from '../models/PaymentIntent';
import { FindPlayerByIdResponseDto, PlayerWithCategoriesAndDiscountTypesBodyDto } from '../models/PlayerMainResponseDto';
import { StripeComponent } from '../stripe/stripe.component';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {
  public parameterValue!: string;
  paymentMethods!:FormGroup;

  paymentForm!: FormGroup;
  GetAllDiscountsForPlayerOfCompanyList!:DiscountBodyDto[]
  private currentNumber = 0;
  listdata!:BaseBody
  name:string;
  playerId!: number  ;

  discountValue!: number;
 listAmount!:number;
  DiscountId!:number;


  PlayerList!:PlayerWithCategoriesAndDiscountTypesBodyDto[];

 listSecret!:string;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,public dialogRef: MatDialogRef<PurchaseComponent>,private route: ActivatedRoute,private authService: AuthService,private http:HttpClient,private router:Router ,private fb : FormBuilder) { this.playerId = data.playerId;
    this.name=data.Name;
  this.discountValue=data.discountValue;
  this.DiscountId=data.DiscountId;
  }
 
  ngOnInit(): void {

  
    this.getCompanyId();
    this.getplayer();
  }

quantity:number=0;

i=0;
plus(){
  if(this.i !=50)
  this.i++;
  this.quantity=this.i;
  // this.discountValue=this.discountValue*this.i;





// var discountId= this.

const discountId = this.DiscountId;

console.log(discountId);
var quantity=this.quantity;
console.log(quantity);
  

this.http.get<GetTotalAmountResponseDto>('https://localhost:7098/Purchase/GetTotalAmount?discountId='+discountId+ '&quantity='+quantity).pipe(
  map(result => result.totalAmount)
).subscribe(
  data => {
    
  this.listAmount = data


}


)}


minus(){
if(this.i !=0)
this.i--;
this.quantity=this.i;






const discountId = this.DiscountId;

console.log(discountId);
var quantity=this.quantity;
console.log(quantity);

this.http.get<GetTotalAmountResponseDto>('https://localhost:7098/Purchase/GetTotalAmount?discountId='+discountId+ '&quantity='+quantity).pipe(
  map(result => result.totalAmount)
).subscribe(
  data => {
    
  this.listAmount = data


}


)




// this.http.get<GetTotalAmountResponseDto>('https://localhost:7098/Purchase/GetTotalAmount?discountId='+discountId,+'&quantity='+ s).pipe()
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




   getplayer(){
    var lon= this.data.playerId;
    this.http.get<FindPlayerByIdResponseDto>('https://localhost:7098/Player/FindById?id='+lon).pipe(
      map(res=>res.players)
    ).subscribe(data=>{
      this.PlayerList=data;
      console.log(this.PlayerList);
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


Proceed(){
  const discountId = this.DiscountId;

 
  var quantity=this.quantity;

this.http.get<PaymentIntentResponseDto>('https://localhost:7098/Stripe/CreatePaymentIntent?discountId='+ discountId +'&&numberOfCodes=' + quantity).pipe(
  map(result => result.clientSecret)
).subscribe(
  data => {
    
  this.listSecret = data


}


)



}
























   onSubmit(): void {}
}
