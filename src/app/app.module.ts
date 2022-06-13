import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { Router, ActivatedRoute } from '@angular/router';

import { authInterceptorProviders } from './_helpers/auth.interceptor';

import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';


import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';





import { MaterialExampleModule } from './material.module';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CategorypageComponent } from './categorypage/categorypage.component';
import { BackgroundComponent } from './background/background.component';
import { FooterComponent } from './footer/footer.component';
import { PlayersComponent } from './players/players.component';
import { VouchersComponent } from './vouchers/vouchers.component';
import { PurchaseComponent } from './purchase/purchase.component';

import { NgxStripeModule } from 'ngx-stripe';
import { StripeComponent } from './stripe/stripe.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MybenefitsComponent } from './mybenefits/mybenefits.component';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbPopoverModule } from 'mdb-angular-ui-kit/popover';
import { MdbRadioModule } from 'mdb-angular-ui-kit/radio';
import { MdbRangeModule } from 'mdb-angular-ui-kit/range';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbScrollspyModule } from 'mdb-angular-ui-kit/scrollspy';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { ModalComponent } from './modal/modal.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    CategorypageComponent,
    BackgroundComponent,
    FooterComponent,
    PlayersComponent,
    VouchersComponent,
    PurchaseComponent,
    StripeComponent,
    CheckoutComponent,
    MybenefitsComponent,
    ModalComponent,
  ],




  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialExampleModule,
    MatDialogModule,
    MatSidenavModule,
  
    MatListModule,

    NgxStripeModule.forRoot('pk_test_51L8ip2FfGn5fJOchgEPyBjBCF8Tvr0fCY8T2OWkT6syBvVUFAFumFe1DmsdwkyqJqjgagJo6M7l8RAlHxTZyU5UL00SD24xMCO'),

    MdbAccordionModule,

    MdbCarouselModule,

    MdbCheckboxModule,

    MdbCollapseModule,

    MdbDropdownModule,

    MdbFormsModule,

    MdbModalModule,

    MdbPopoverModule,

    MdbRadioModule,

    MdbRangeModule,

    MdbRippleModule,

    MdbScrollspyModule,

    MdbTabsModule,

    MdbTooltipModule,

    MdbValidationModule,

    NoopAnimationsModule,

  ],



  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
