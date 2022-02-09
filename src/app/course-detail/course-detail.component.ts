import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
import { ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Content } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {

  coursedetails:any=[];
  courseservice:CourseService;
  closeResult: string="";

  id:string="";
  constructor(courseservice:CourseService,private route:ActivatedRoute,
    private modalService:NgbModal) {
    this.courseservice=courseservice;
  }

  ngOnInit(): void {
    this.id=String(this.route.snapshot.paramMap.get('courseid'));
    this.getcoursedetails(this.id) ;
  }

  addToCart(product:any){
    this.courseservice.addToCart(product);

  }
  getcoursedetails(id:string) {
    this.courseservice.getData().subscribe(
      (data:any) => {
        this.coursedetails = data.find((a:any)=>a.id===id);
      }
    );

  }

  open(content:string) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
