import { Component, OnInit } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
  ]
})
export class ShellComponent implements OnInit {

  constructor() { }

  menuState:string = 'out';
  outlineState:string = 'off';

  ngOnInit() { }

  togglePanel() {
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
  }

  toggleOutlines() {
    this.outlineState = this.outlineState === 'off' ? 'on' : 'off';
  }

  closePanel() {
    this.menuState = 'out';
  }

  openPanel() {
    this.menuState = 'in';
  }

}
