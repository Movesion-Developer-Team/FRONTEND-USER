export interface GetAllPlayersResponseDto{
    message: string;
    statusCode: string;
    players:PlayerBodyDto[];

}


export interface PlayerBodyDto{
id: number| undefined;
shortName	:string;
fullName:	string;
playStoreLink	:string
appStoreLink:	string
linkDescription	:string
color:	string;
       

}

