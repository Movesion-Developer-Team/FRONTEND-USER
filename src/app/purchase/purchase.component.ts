import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NumberValueAccessor, Validators } from '@angular/forms';
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

import { StripeService, StripeCardComponent } from 'ngx-stripe';
import {
  StripeCardElementOptions,
  StripeElementsOptions
} from '@stripe/stripe-js';
import { getMatIconNoHttpProviderError } from '@angular/material/icon';


declare var Stripe: any;
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

  stripe!:any;
  cardElement!:any;


  PlayerList!:PlayerWithCategoriesAndDiscountTypesBodyDto[];

 listSecret!:string;
 @ViewChild(StripeCardComponent) card!: StripeCardComponent;

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'it'
  };

  stripeTest!: FormGroup;


  constructor(private stripeService: StripeService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,public dialogRef: MatDialogRef<PurchaseComponent>,private route: ActivatedRoute,private authService: AuthService,private http:HttpClient,private router:Router ,private fb : FormBuilder) { this.playerId = data.playerId;
    this.name=data.Name;
  this.discountValue=data.discountValue;
  this.DiscountId=data.DiscountId;
  }
 
  ngOnInit(): void {
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]]
      
    });
  
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
console.log(this.listSecret);

}


)



}


ngAfterViewInit() {
  this.payment();
 
  }

   payment() {

   this.stripe = Stripe('pk_test_51L8ip2FfGn5fJOchgEPyBjBCF8Tvr0fCY8T2OWkT6syBvVUFAFumFe1DmsdwkyqJqjgagJo6M7l8RAlHxTZyU5UL00SD24xMCO');
   var elements = this.stripe.elements();
   var style = {
   base: {
   iconColor: '#666EE8',
   color: '#31325F',
   lineHeight: '50px',
   fontWeight: 400,
   fontFamily: 'Helvetica Neue',
   fontSize: '18px',
   '::placeholder': {
     color: '#CFD7E0',
     },
    },
  };
  this.cardElement = elements.create('card', { style: style });
  this.cardElement.mount('#card-element');
  }
  sendPayment() {
    this.Proceed();


  this.stripe
 .confirmCardPayment(
  this.listSecret,
   {
     payment_method: { card: this.cardElement },
     
   }
 )
 .then(function (result: { error: string; }) {
   if (result.error) {
     console.log(result.error, ' ==== error');
   } else {
     console.log('success ==== ', result);
   }
   
 });

 
  }


createToken(): void {
  // this.Proceed();
//   const name = this.stripeTest.get('name')?.value;

//   this.stripeService
//     .createToken(this.card.element,{name})
//     .subscribe((result) => {
//       if (result.token) {
//         // Use the token
//         console.log(result.token.id);
//       } else if (result.error) {
//         // Error creating the token
//      alert(result.error.message);
//       }
//     });
// }
}















   onSubmit(): void {}
}
