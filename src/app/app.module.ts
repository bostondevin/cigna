import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { ToastModule } from 'ng2-toastr/ng2-toastr';

import { RestangularModule, Restangular } from 'ngx-restangular';

import { Ng2Webstorage } from 'ng2-webstorage';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { HomeModule } from './home/home.module';
import { AboutModule } from './about/about.module';
import { LoginModule } from './login/login.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


export function RestangularConfigFactory (RestangularProvider: any) {
  // RestangularProvider.setBaseUrl('http://api.restngx.local/v1');
  RestangularProvider.setDefaultHeaders({'Authorization': 'Bearer UDXPx-Xko0w4BRKajozCVy20X11MRZs1'});
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    Ng2Webstorage,
    HttpModule,
    ToastModule.forRoot(),
    TranslateModule.forRoot(),
    NgbModule.forRoot(),
    RestangularModule.forRoot(RestangularConfigFactory),
    CoreModule,
    SharedModule,
    HomeModule,
    AboutModule,
    LoginModule,
    AppRoutingModule
  ],
  declarations: [AppComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
