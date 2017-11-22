import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { RoutingModule } from './routing.module';
import { SharedModule } from './shared/shared.module';
import { ProductService } from './services/product.service';
import { UserService } from './services/user.service';
import { MessageService } from './services/message.service';
import { AuthService } from './services/auth.service';
import { AuthGuardLogin } from './services/auth-guard-login.service';
import { AuthGuardAdmin } from './services/auth-guard-admin.service';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { MyPageComponent } from './my-page/my-page.component';
import { AdminComponent } from './admin/admin.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { GoogleMapsComponent } from './google-maps/google-maps.component';

import { AgmCoreModule } from '@agm/core';
import { PaginationComponent } from './pagination/pagination.component';
import { MyProductsComponent } from './my-products/my-products.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    GoogleMapsComponent,
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    MyPageComponent,
    AdminComponent,
    NotFoundComponent,
    ProductDetailsComponent,
    CreateProductComponent,
    PaginationComponent,
    MyProductsComponent,
  ],
  imports: [
    RoutingModule,
    SharedModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD8IMQPEn0qiIw144Sv7hrYDtcGcb7mcvk'
    })
  ],
  providers: [
    AuthService,
    AuthGuardLogin,
    AuthGuardAdmin,
    ProductService,
    UserService,
    MessageService,
    ProductDetailsComponent // Needed to use component in other components
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})

export class AppModule { }
