import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, concatMap, map, of, switchMap, tap, toArray } from 'rxjs';
import { GetAllPlayersResponseDto, PlayerBodyDto } from '../models/GetAllPlayersResponseDto';
import { FindPlayerByIdResponseDto, PlayerWithCategoriesAndDiscountTypesBodyDto } from '../models/PlayerMainResponseDto';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.css']
})
export class ResponseComponent implements OnInit {
  PlayerList!:PlayerWithCategoriesAndDiscountTypesBodyDto[];
  public parameterValue!: string;
  listinfo!:PlayerBodyDto[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<ResponseComponent>, private http:HttpClient,private sanitizer : DomSanitizer ,
  private authService: AuthService,private router:Router ,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getplayer()
   
      }
   

  
  onNoClick(): void {
    this.dialogRef.close();
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
}
