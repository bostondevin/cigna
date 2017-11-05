import { Component, OnInit } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AppService } from '../appservice/app.service';


@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  animations: [

    trigger('slidePanel', [
      state('opened', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('closed', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('opened => closed', animate('400ms ease-in-out')),
      transition('closed => opened', animate('400ms ease-in-out'))
    ]),

    trigger('slideContent', [
      state('opened', style({ width: (window.innerWidth - 380) + 'px'})),
      state('closed', style({ width: '100%'})),
      transition('opened => closed', animate('400ms ease-in-out')),
      transition('closed => opened', animate('400ms ease-in-out'))
    ])


  ]
})
export class ShellComponent implements OnInit {

  constructor(private appService: AppService) { }

  c: any = {};
  menuState: string = this.appService.getLocal('menuState') || 'closed';
  resolutionWidth: number = this.appService.getLocal('resolutionWidth');
  resolutionHeight: number = this.appService.getLocal('resolutionHeight');
  showOutlines: boolean = this.appService.getLocal('showOutlines') || false;
  showGuide: boolean;

  ngOnInit() {

    this.appService.get({service: 'constants'}).subscribe((c: any) => {

      this.c = c[0];

      let o = {};

      if (this.resolutionWidth)
        o[this.c['Width'].sid] = this.resolutionWidth;

      if (this.resolutionHeight)
        o[this.c['Height'].sid] = this.resolutionHeight;

      this.changeResolution(o);

    });

  }

  togglePanel() {
    this.menuState = this.menuState === 'closed' ? 'opened' : 'closed';
    this.appService.saveLocal('menuState', this.menuState);
  }

  toggleOutlines() {
    this.showOutlines = !this.showOutlines;
    this.appService.saveLocal('showOutlines', this.showOutlines);
  }

  changeResolution(d: any) {

    if (this.menuState === 'closed'){

      this.showGuide = false;

      if (d.hasOwnProperty(this.c['Width'].sid)){
        this.resolutionWidth = d[this.c['Width'].sid];
      } else {
        this.resolutionWidth = undefined;
      }

    } else {


      if (d.hasOwnProperty(this.c['Width'].sid)){
        this.showGuide = true;
        this.resolutionWidth = d[this.c['Width'].sid];
      } else {
        this.showGuide = false;
        this.resolutionWidth = window.innerWidth - 380;
      }

    }

    this.resolutionHeight = d[this.c['Height'].sid];

    this.appService.saveLocal('resolutionWidth', this.resolutionWidth);
    this.appService.saveLocal('resolutionHeight', this.resolutionHeight);

  }

  closePanel() {
    this.menuState = 'closed';
    this.changeResolution({});
    this.appService.saveLocal('menuState', this.menuState);
  }

  openPanel() {
    this.menuState = 'opened';
    this.changeResolution({});
    this.appService.saveLocal('menuState', this.menuState);
  }

}
