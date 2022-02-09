import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  cartqty:number=0;
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

  }
}
