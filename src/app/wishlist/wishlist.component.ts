import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
declare var window:any
@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  cartitems:any;
  wishlistcart:any

  constructor(private courseservice:CourseService) { }

  ngOnInit(): void {
    this.wishlistcart= new window.bootstrap.Modal(
      document.getElementById("wishlistcart"));
    this.getdata();
  }

  getdata(){
    this.courseservice.wishlistcartItems.subscribe(
      (data: any)=> this.cartitems=data
    )
  }
  sendtocart(product:any){
    this.courseservice.addToCart(product);
    this.courseservice.removefromWishlist(product);
    this.wishlistcart.show();
  }
  closemodal(modal:any){
    modal.hide();
  }
  deletefromwishlist(product:any){
    this.courseservice.removefromWishlist(product);
  }

}
