import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
declare var window:any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private course :CourseService) { }

  ngOnInit(): void {
    this.cartModal= new window.bootstrap.Modal(
      document.getElementById("cartmodal")
    )
    this.cartModalExists= new window.bootstrap.Modal(
      document.getElementById("alreadypresent")
    )

    this.getData();
  }

  closeModal(modal:any){
    modal.hide();
  }


  cartModal:any;
  cartModalExists:any;
  asc:string="asc";
  p:any;
  data:any=[];
  getData() {
    this.course.getData().subscribe(
      (data) => {
        this.data = data;
      }
    );
  }
   addToCart(product:any){
     let response:number=(this.course.addToCart(product));

     if(response>0){
      this.cartModal.show();
     }
     else if(response===0){
       this.cartModalExists.show();
     }

   }
   sortcartasc(order:string){
     if(order==='asc')
     this.data.sort((a:any, b:any) => a.discounted_price.localeCompare(b.discounted_price));
     if(order==='desc')
     this.data.sort((a:any, b:any) => parseFloat(b.discounted_price) - parseFloat(a.discounted_price));
   }

   filtercourses(id:any){
    this.data = this.data.filter(function (el:any)
    {
      return el.title.includes((id.target as HTMLInputElement).value);
    }
    );


   }
}
