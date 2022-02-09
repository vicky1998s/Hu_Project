import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule} from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import { CartComponent } from './cart/cart.component';
import { CourseService } from './course.service';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CartLayoutComponent } from './cart-layout/cart-layout.component';

const routes=[
  {path:'Home',component:DashboardComponent},
  {path:'Wishlist',component:WishlistComponent},
  {path:'Coursedetail/:courseid',component:CourseDetailComponent},
  {path:'Cart',component:CartLayoutComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    DashboardComponent,
    CartComponent,
    WishlistComponent,
    CourseDetailComponent,
    CartLayoutComponent
  ],
  imports: [
    BrowserModule,RouterModule.forRoot(routes),HttpClientModule,NgxPaginationModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
