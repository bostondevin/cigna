import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../appservice/app.service';
import { Observable, ReplaySubject } from 'rxjs';
import 'rxjs/add/observable/zip';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {


  @Output() closePanel = new EventEmitter();
  @Output() toggleOutlines = new EventEmitter();
  @Output() changeResolution = new EventEmitter();

  constructor(private router: Router, private appService: AppService) { }


  sourceBuilderTools = [
    { name: 'Section', children: [] as any[], inputType: 'section', icon: 'section', class: 'wide' },
    { name: 'A String', inputType: 'string', icon: 'field-text', class: 'half' },
    { name: 'A Number', inputType: 'number', icon: 'field-numeric', class: 'half' }
  ];

  c: any = {};
  resolutions: any = [];


  ngOnInit() {


    this.appService.get({service: 'constants'}).subscribe((c: any) => {

      this.c = c[0];

      this.appService.get({
        service: 'list', 
        id: this.c['PaletteSizeCollection'].sid,
        select: [
          this.c['Label'].sid,
          this.c['FontAwesomeIcon'].sid,
          this.c['Width'].sid,
          this.c['Height'].sid
        ]
      }).subscribe((resolutions: any) => {

        this.resolutions = resolutions;

      });
    });


/*
    Observable.zip(
      this.appService.get({service: 'constants'}),
      this.appService.get({service: 'list'}))
    .subscribe(([constants, b]) => {

      const c = constants[0]; // Thing Definitions

      console.log(c['PaletteSizeCollection']);

    });


    this.appService.getConstants().subscribe((data: any) => {
      let c = data[0];
      console.log(c);
    })

    this.appService.get({
      service: 'list'
    }).subscribe( (data: any) => {
      console.log(data);
    });

    AppService.get('api/list/' + c.PaletteSizeCollection, null, c.FontAwesomeIcon, null, false, null).then(function(resp2){
        $scope.resolutions = resp2;
    });
*/


  }


  setResolution(resolution: any){
    console.log('Width ' + resolution[this.c['Width'].sid]);
    this.changeResolution.emit(resolution);
  }

  builderDrag(e: any) {
    const item = e.value;
    item.data = item.inputType === 'number' ? (Math.random() * 100) | 0 : Math.random().toString(36).substring(20);
  }

  hidePanel(button: any){
    this.closePanel.emit(button);
  }

  showHideOutlines(button: any){
    this.toggleOutlines.emit(button);
  }

}
