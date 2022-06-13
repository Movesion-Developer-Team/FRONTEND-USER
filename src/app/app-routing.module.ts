import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { CategorypageComponent } from './categorypage/categorypage.component';
import { FooterComponent } from './footer/footer.component';
import { PlayersComponent } from './players/players.component';
import { VouchersComponent } from './vouchers/vouchers.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { StripeComponent } from './stripe/stripe.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MybenefitsComponent } from './mybenefits/mybenefits.component';
import { ModalComponent } from './modal/modal.component';



const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'categorypage', component: CategorypageComponent},
  {path:'footer', component: FooterComponent},
  {path:'players/:categoryId', component: PlayersComponent },
  { path:'vouchers/:playersId', component: VouchersComponent},
  { path:'categorypage/:categoryId/players/:playerId', component: VouchersComponent},

  { path:'purchase/:playersId',component: PurchaseComponent},
  {path:'stripe', component: StripeComponent},

  {path:'checkout', component: CheckoutComponent},
{path:'modal',component: ModalComponent},
  {path:'mybenefits', component:MybenefitsComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },





];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
