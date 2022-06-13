export interface GetCurrentUserInfoResponseDto{
    message: string ;
   statusCode:number;

   companyId:BaseBody ;
}


export interface BaseBody{
    id:number;
}