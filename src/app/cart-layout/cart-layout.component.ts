import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
declare var window:any;

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
  deletecart:any;
  checkoutcart:any;
  wishlistcart:any;
  wishlistcartexists:any;

  constructor(private courseservice:CourseService) { }

  ngOnInit(): void {
    this.wishlistcart= new window.bootstrap.Modal(
      document.getElementById("wishlistcart"));
    this.deletecart= new window.bootstrap.Modal(
      document.getElementById("removecart"));
    this.checkoutcart= new window.bootstrap.Modal(
        document.getElementById("Checkoutcart"));
    this.wishlistcartexists= new window.bootstrap.Modal(
          document.getElementById("wishlistcartexists"));
    this.getCartdata();
    this.getData();
  }

  closeModal(modal:any){
    modal.hide();
  }

  ClearCart(modal:any){
   this.courseservice.clearall();
   modal.show();
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
         this.recommendeditems= data.filter((cv:any) =>{
          return !this.cartitems.find(function(e:any){
              return e.id == cv.id;
          });
      });

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
  this.deletecart.show();
  }

  openModal(modal:any){
    modal.show();
  }

  addwishlist(product:any){
    let response:number=(this.courseservice.addtowishlist(product));

     if(response>0){
      this.courseservice.removefromcart(product.id);
      this.coursecount=this.cartitems.length;
      this.wishlistcart.show();
     }
     else{
       this.wishlistcartexists.show();
     }

  }
  movefromrecommended(product:any){
    let response:number=(this.courseservice.addtowishlist(product));
    if(response>0){
      this.wishlistcart.show();
     }
  }

}
