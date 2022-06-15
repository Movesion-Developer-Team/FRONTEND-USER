export interface FindPlayerByIdResponseDto{
    message: string;
    statusCode: string;
    players:PlayerWithCategoriesAndDiscountTypesBodyDto[];

}


export interface PlayerWithCategoriesAndDiscountTypesBodyDto{
id: number| undefined;
shortName	:string;
fullName:	string;
playStoreLink	:string
appStoreLink:	string
linkDescription	:string
color:	string;
discountTypes:DiscountTypeBodyDto[];
categories:CategoryBodyDto[]

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