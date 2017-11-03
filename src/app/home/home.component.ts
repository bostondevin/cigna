import 'rxjs/add/operator/finally';

import { Component, OnInit } from '@angular/core';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { QuoteService } from './quote.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  quote: string;
  isLoading: boolean;

  constructor(private quoteService: QuoteService, private restangular: Restangular) {}

  ngOnInit() {
    this.isLoading = true;

    this.restangular.one('users', 2).all('accounts').getList();
    
    this.quoteService.getRandomQuote({ category: 'dev' })
      .finally(() => { this.isLoading = false; })
      .subscribe((quote: string) => { this.quote = quote; });
  }



  theme = 'dark';

  orderableList = ['Item 1', 'Item 2', 'Item 3'];
  orderableLists = [
    ['Item 1a', 'Item 2a', 'Item 3a'],
    ['Item 1b', 'Item 2b', 'Item 3b']
  ];

  nestedLists = [
    { label: 'Item 1', children: [] as any[] },
    { label: 'Item 2', children: [
        { label: 'Item 2a', children: [] as any[] },
        { label: 'Item 2b', children: [] as any[] },
        { label: 'Item 2c', children: [] as any[] },
      ]
    },
    { label: 'Item 3', children: [
        { label: 'Item 3a', children: [] as any[] },
        { label: 'Item 3b', children: [] as any[] },
        { label: 'Item 3c', children: [] as any[] },
      ]
    },
  ];

  sourceItems = [
    { label: 'Item 1' },
    { label: 'Item 2' },
    { label: 'Item 3' }
  ];
  targetItems: any[] = [];
  targetItemsA: any[] = [];
  targetItemsB: any[] = [];

  sourceNestedItems = [
    { label: 'Item 1, no children', children: [] as any[] },
    { label: 'Item 2', children: [
        { label: 'no' },
        { label: 'children' }
      ]
    },
    { label: 'Item 3, can\'t have children' }
  ];
  targetNestedItems: any[] = [];

  targetBuilderTools: any[] = [];

  droppableItemClass = (item: any) => `${item.class} ${item.inputType}`;

  log(e: any) {
    console.log(e.type, e);
  }

  canMove(e: any): boolean {
    return e.indexOf('Disabled') === -1;
  }




}
