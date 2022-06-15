export interface GetAllPlayersForCurrentCompanyResponseDto{
    message: string;
    statusCode: number;
    players: PlayerOnlyBodyDto[];
}

export interface PlayerOnlyBodyDto {
id: number;
shortName: string;
fullName: string;
playStoreLink:string;
appStoreLink:string;
linkDescription:string;
color:string;
image:BaseImageBodyDto;
}

export interface BaseImageBodyDto {
id:number;
content:string;
categoryId:number;
playerId:number;
}