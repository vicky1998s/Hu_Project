import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-cart-layout',
  templateUrl: './cart-layout.component.html',
  styleUrls: ['./cart-layout.component.css']
})
export class CartLayoutComponent implements OnInit {
  cartitems:any=[];
  recommendeditems:any=[];
  p:any;
  coursecount:number=0;
  totalprice:number=0;
  savedamount:number=0;
  constructor(private courseservice:CourseService) { }

  ngOnInit(): void {
    this.getCartdata();
    this.getData();
  }

  getCartdata(){
    this.courseservice.newcartItems.subscribe(
      data=>{this.cartitems=data;
        this.coursecount=data.length;
      }

    );
  }
  getData() {
    this.courseservice.getData().subscribe(
      (data:any) => {
        this.recommendeditems = data.slice(1,4);

      }
    );
    this.courseservice.totalprice.subscribe(
      data=>this.totalprice=data
    );
    this.courseservice.discountprice.subscribe(
      data=>this.savedamount=data
    );
  }
  deletefromcart(id:string){
  this.courseservice.removefromcart(id);
  this.coursecount=this.cartitems.length;
  }

}
