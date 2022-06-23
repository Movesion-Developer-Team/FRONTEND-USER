export interface GetAllOrdersOfCurrentUserResponseDto {
  message: string;

  statusCode: number;

  codes: UserDiscountCodeBodyDto[];
}
export interface UserDiscountCodeBodyDto {
  orderDateTime: Date;
  playerName: string;
  finalPrice: number;
  discountTypeName: string;
  priceInPoints: number;
  code: Text;
}
