import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mgx-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {

	constructor() { }

	@Input('icon') icon: string;

	classNames:any = [];

	ngOnInit() {

		this.classNames.push(this.icon);

		if (this.icon.indexOf('mdi-') === 0)
			this.classNames.push('mdi');

		if (this.icon.indexOf('fa-') === 0)
			this.classNames.push('fa');

	}

}
