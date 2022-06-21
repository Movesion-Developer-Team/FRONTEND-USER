import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NumberValueAccessor, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { interval, map } from 'rxjs';
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
  StripeCardElementOptions} from '@stripe/stripe-js';
import { getMatIconNoHttpProviderError } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { StripePaymentElementComponent } from 'ngx-stripe';
import { PaymentIntent} from '@stripe/stripe-js';
import {  StripeElementsOptions} from '@stripe/stripe-js';
import { ResponseComponent } from '../response/response.component';
import { BaseResponse } from '../models/BaseResponse';



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
  cardElement!:any
  PlayerList!:PlayerWithCategoriesAndDiscountTypesBodyDto[];
 listSecret!:string;
 @ViewChild(StripePaymentElementComponent)
  paymentElement!: StripePaymentElementComponent;
salar!:any;


paymentElementForm = this.fb.group({
  name: ['John doe', [Validators.required]],
  email: ['support@ngx-stripe.dev', [Validators.required]],
  address: [''],
  zipcode: [''],
  city: [''],
  // amount: [25, [Validators.required]]
});

elementsOptions: StripeElementsOptions = {
  locale: 'en'
};

paying = false;

  constructor(private stripeService: StripeService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,public dialogRef: MatDialogRef<PurchaseComponent>,private route: ActivatedRoute,private authService: AuthService,private http:HttpClient,private router:Router ,private fb : FormBuilder) { this.playerId = data.playerId;
    this.name=data.Name;
  this.discountValue=data.discountValue;
  this.DiscountId=data.DiscountId;
  }
 
  ngOnInit(): void {
  

  this.plus();
  this.getCompanyId();
  this.getplayer();
  
  }

  pay(item: DiscountBodyDto) {
    if (this.paymentElementForm.valid) {
      this.paying = true;
      this.stripeService.confirmPayment({
        elements: this.paymentElement.elements,
        confirmParams: {
          payment_method_data: {
            billing_details: {
              name: this.paymentElementForm.get('name')?.value,
              email: this.paymentElementForm.get('email')?.value,
              address: {
                line1: this.paymentElementForm.get('address')?.value || '',
                postal_code: this.paymentElementForm.get('zipcode')?.value || '',
                city: this.paymentElementForm.get('city')?.value || '',
              }
            }
          }
        },
        redirect: 'if_required'
      }).subscribe(result => {
        this.paying = false;
        console.log('Result', result);
      
      // this.salar.push(result);
        if (result.error) {
          alert('an error occurred while processing the request');
        } else {
          if (result.paymentIntent?.status === 'succeeded') {
            // alert('  The payment has been processed!');
            this.dialogRef.close();
            this.dialog.open(ResponseComponent, {
              width: '400px',
              height:'310px',
          
              data: {
                playerId:item.playerId,
              },
            })
          }
        }
      });
    } else {
      console.log(this.paymentElementForm);
    }
  }


PaymentIntent(){
  var discountId = this.DiscountId;
  console.log(discountId);
  this.createPaymentIntent(discountId,this.quantity)
  .subscribe(pi => {
    this.elementsOptions.clientSecret = pi.clientSecret;
  });
}


 completeOrder(result:any,discountId:number,quantity:number): Observable<BaseResponse>{
  console.log(result);

  var discountId = this.DiscountId;
    var quantity=this.quantity;
  var result= this.salar;
    return this.http.post<BaseResponse>(
      `https://localhost:7098/Purchase/CompleteOrder?status=${result}&discountId=${discountId}&numberOfCodes=${quantity}`,{}
    );
  }



  private createPaymentIntent(Id:number,quantity:number): Observable<PaymentIntentResponseDto> {
    var discountId = this.DiscountId;
    var quantity=this.quantity;
   
    return this.http.post<PaymentIntentResponseDto>(
      `https://localhost:7098/Stripe/CreatePaymentIntent?discountId=${discountId}&numberOfCodes=${quantity}`,{}
    
      
    );
  }


quantity:number=1;
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
console.log(data);

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


onSubmit(): void {}


}
