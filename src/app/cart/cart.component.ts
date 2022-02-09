import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartqty:number=0;
  totalprice:number=0;
  isnoproductincart:boolean=true;
  cartitems:any=[];


  courseservice:CourseService;
  constructor(courseservice:CourseService) {
    this.courseservice=courseservice;
  }

  ngOnInit(): void {
    this.updatecartstatus();
  }

  updatecartstatus(){
    this.courseservice.cartQty.subscribe(
      data=>this.cartqty=data
    );
    this.courseservice.totalprice.subscribe(
      data=>this.totalprice=data
    );
    this.courseservice.newcartItems.subscribe(
      data=>this.cartitems=data

    );

  }

}
