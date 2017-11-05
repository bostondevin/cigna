import { Injectable } from '@angular/core';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { LocalStorageService, SessionStorageService } from 'ng2-webstorage';
import { Observable, ReplaySubject } from 'rxjs';


@Injectable()
export class AppService {

	applicationId = "cigna";

	constructor(private restangular: Restangular, 
		private localStorage: LocalStorageService) { }

	get(req: any) {

		let newObj = Object.assign({
			service: '', 
			userId: '',
			deepPopulate: '', 
			isPrivate: false, 
			clearLayoutCache: false, 
			populate: '',
			locale: ''
		}, req);

		if (req.hasOwnProperty('select'))
			newObj.select = req.select.join(' ');

		if (newObj.hasOwnProperty('id')){
            return this.restangular.one(newObj.service, newObj.id).get(newObj).publishReplay(1).refCount();
        } else {
			return this.restangular.all(newObj.service).getList(newObj).publishReplay(1).refCount();
        }

	}

	getLocal(name: string) {
		return this.localStorage.retrieve(this.applicationId + '_' + name);
	}
	
	saveLocal(name: string, data: any) {
		this.localStorage.store(this.applicationId + '_' + name, data);
	}

	initiateApplication() {
		this.get({service: 'constants'});
	}

}