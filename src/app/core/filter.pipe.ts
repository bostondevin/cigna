import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'GroupFilter'})

export class FilterPipe implements PipeTransform {
  transform(items: any[], searchBy: string, searchText: string): any[] {

    if (!items) return [];
    if (!searchText) return items;

	return items.filter( (it: any) => {
		return it.hasOwnProperty(searchBy) && it[searchBy]._id === searchText;
	});

   }
}