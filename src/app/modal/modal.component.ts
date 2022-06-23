import { style } from '@angular/animations';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { map } from 'rxjs';
import { GetAllOrdersOfCurrentUserResponseDto,UserDiscountCodeBodyDto} from '../models/GetAllOrdersOfCurrentUserResponseDto';
import {Clipboard} from '@angular/cdk/clipboard';







@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})


export class ModalComponent  {

  listCodes!:UserDiscountCodeBodyDto[]







  constructor( private http :HttpClient , public modalRef: MdbModalRef<ModalComponent>, private clipboard: Clipboard) { 

} 




  ngOnInit(): void {
    this.GetAllOrdersOfCurrentUserResponseDto();
  
  }
  copyHeroName() {
    this.clipboard.copy('Alphonso');
  }
  applyFilter() {
    this.listCodes.filter 
    console.log(this.listCodes.filter);}

  GetAllOrdersOfCurrentUserResponseDto(){
    this.http.get<GetAllOrdersOfCurrentUserResponseDto>('https://localhost:7098/Purchase/GetAllOrdersOfCurrentUser').pipe(
      map(result=>result.codes)
    )
    .subscribe({
      next: data => {
      this.listCodes = data;

   },

  })


  }

}
