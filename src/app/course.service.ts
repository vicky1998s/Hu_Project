import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
// export class Courses{
//   public id:number=0;
//   public title:string="";
//   public author:string="";
//   public tags:string[]=[];
//   public discounted_price:number=0;
//   public actual_price:number=0;
//   constructor(){

//   }
// }
export class CourseService {
  public cartItems:any = [];
  newcartItems:Subject<[any]>=new BehaviorSubject<any>([]);
  public buyNowItem = [];
  totalprice: Subject<number> = new BehaviorSubject<number>(0);
  discountprice: Subject<number> = new BehaviorSubject<number>(0);
  totalQty: Subject<number> = new BehaviorSubject<number>(0);
  cartQty: Subject<number> = new BehaviorSubject<number>(0);
  detailQtyPlus: Subject<number> = new BehaviorSubject<number>(0);
  foundcourses:any=[];
  constructor(private httpService: HttpClient) { }

  getData() {
    return this.httpService.get('./assets/Courses.json');
  }

 removefromcart(id:string){
   this.cartItems.splice(this.cartItems.indexOf((a:any)=>a.id===id),1);
   //this.newcartItems.next(this.cartItems);
   this.computeCartTotals();
 }
  addToCart(cartitem: any) {
    var mergedcartitem = Object.assign({}, cartitem, { 'quantity': 1, 'item': 1 });
    let alreadyincart:boolean=false;
    let existingcartitem= undefined;

    if(this.cartItems.length>0){
        existingcartitem=this.cartItems.find((tempcart: any) =>tempcart.id===cartitem.id);
        //existingcartitem=true;
        alreadyincart=(existingcartitem!=undefined)
    }
     if(alreadyincart){
       return 0;
     }
     else{
       this.cartItems.push(mergedcartitem);

     }
    this.newcartItems.next(this.cartItems);
    return this.computeCartTotals();
  }

  computeCartTotals(){
     let totalPriceValue:number=0;
     let actualPriceValue:number=0;
     let totalQtyValue:number=0;
     let cartProductQty:number=0;
     let detailQty:number=0;

     for(let currentitem of this.cartItems){
       totalPriceValue +=currentitem.quantity * currentitem.discounted_price;
       actualPriceValue +=currentitem.quantity * currentitem.actual_price;
       totalQtyValue +=currentitem.quantity
       detailQty += currentitem.quantity
     }
     cartProductQty += this.cartItems.length;
     this.totalprice.next(totalPriceValue);
     this.discountprice.next(actualPriceValue-totalPriceValue);
     this.totalQty.next(totalQtyValue);
     this.cartQty.next(cartProductQty);
     this.detailQtyPlus.next(detailQty);

  }

}
