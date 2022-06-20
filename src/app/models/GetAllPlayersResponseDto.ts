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
image: BaseImageBodyDto;
discountTypes:DiscountTypeBodyDto[];
categories:CategoryBodyDto[]
tempImage: any | undefined;
}

export interface BaseImageBodyDto{
    id: number;
    content: string;
    categoryId: number;
    playerId: number;
}

export interface DiscountTypeBodyDto{

    id: number;
    name: string;
    description: string;
}

export interface CategoryBodyDto{
    id: number;
    name: string;
    description: string;
}