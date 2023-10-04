export class Prediction {
  fullName: string;
  totalSupply: number;
  companyName: string;
  buyPrice: number;

  constructor(fullName: string,totalSupply:number, companyName: string, buyPrice:number){
    this.fullName = fullName;
    this.totalSupply = totalSupply;
    this.companyName = companyName;
    this.buyPrice = buyPrice;
  }
}
