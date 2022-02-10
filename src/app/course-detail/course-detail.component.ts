import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
import { ActivatedRoute } from '@angular/router';
declare var window:any;

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {
  showcart:any;
  alreadyexists:any;
  coursedetails:any=[];
  courseservice:CourseService;
  closeResult: string="";
  wishlistcart:any;
  wishlistcartexists:any;

  id:string="";
  constructor(courseservice:CourseService,private route:ActivatedRoute) {
    this.courseservice=courseservice;
  }
  openModal(modal:any){
    modal.show();
  }
  CloseModal(modal:any){
    modal.hide();
  }

  ngOnInit(): void {
    this.showcart= new window.bootstrap.Modal(
      document.getElementById("cartmodal"));
    this.alreadyexists= new window.bootstrap.Modal(
        document.getElementById("alreadypresent"));
   this.wishlistcart= new window.bootstrap.Modal(
      document.getElementById("wishlistcart"));
      this.wishlistcartexists= new window.bootstrap.Modal(
        document.getElementById("wishlistcartexists"));
    this.id=String(this.route.snapshot.paramMap.get('courseid'));
    this.getcoursedetails(this.id) ;
  }

  addToCart(product:any){
    let response:number=(this.courseservice.addToCart(product));

    if(response>0){
     this.showcart.show();
    }
    else if(response===0){
      this.alreadyexists.show();
    }

  }
  getcoursedetails(id:string) {
    this.courseservice.getData().subscribe(
      (data:any) => {
        this.coursedetails = data.find((a:any)=>a.id===id);
      }
    );

  }
  addwishlist(product:any){
    let response:number=(this.courseservice.addtowishlist(product));

     if(response>0){
      this.courseservice.removefromcart(product.id);
      this.wishlistcart.show();
     }
     else{
       this.wishlistcartexists.show();

     }

  }

}
