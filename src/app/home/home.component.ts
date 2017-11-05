import 'rxjs/add/operator/finally';

import { Component, OnInit } from '@angular/core';
import { RestangularModule, Restangular } from 'ngx-restangular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private restangular: Restangular) {}

  ngOnInit() {

    //this.restangular.all('constants').getList();
  
  }

  targetBuilderTools: any[] = [];

  droppableItemClass = (item: any) => `${item.class} ${item.inputType}`;

  log(e: any) {
    console.log(e.type, e);
  }

  canMove(e: any): boolean {
    return e.indexOf('Disabled') === -1;
  }

}
