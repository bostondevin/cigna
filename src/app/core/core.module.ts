import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule, Http, XHRBackend, ConnectionBackend, RequestOptions } from '@angular/http';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ShellComponent } from './shell/shell.component';
import { HeaderComponent } from './shell/header/header.component';
import { FooterComponent } from './shell/footer/footer.component';
import { PanelComponent } from './shell/panel/panel.component';
import { IconComponent } from './ui/icon/icon.component';
import { NavBarComponent } from './ui/navbar/navbar.component';




import { AppService } from './appservice/app.service';


import { AuthenticationService } from './authentication/authentication.service';
import { AuthenticationGuard } from './authentication/authentication.guard';
import { I18nService } from './i18n.service';
import { HttpService } from './http/http.service';
import { HttpCacheService } from './http/http-cache.service';

import { FilterPipe} from './filter.pipe';

import { NgxDnDModule } from '@swimlane/ngx-dnd'
import { NgxUIModule } from '@swimlane/ngx-ui';

export function createHttpService(backend: ConnectionBackend,
                                  defaultOptions: RequestOptions,
                                  httpCacheService: HttpCacheService) {
  return new HttpService(backend, defaultOptions, httpCacheService);
}

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    TranslateModule,
    NgbModule,
    NgxDnDModule,
    NgxUIModule,
    RouterModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    ShellComponent,
    PanelComponent,
    IconComponent,
    NavBarComponent,
    FilterPipe
  ],
  providers: [
    AppService,
    AuthenticationService,
    AuthenticationGuard,
    I18nService,
    HttpCacheService,
    {
      provide: Http,
      deps: [XHRBackend, RequestOptions, HttpCacheService],
      useFactory: createHttpService
    }
  ]
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    // Import guard
    if (parentModule) {
      throw new Error(`${parentModule} has already been loaded. Import Core module in the AppModule only.`);
    }
  }

}
