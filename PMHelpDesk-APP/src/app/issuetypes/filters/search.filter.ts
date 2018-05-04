import { Injectable, Pipe, PipeTransform } from '@angular/core';

import { IssueType } from '../../models/issuetype';

@Pipe({
    name: 'issuetypesearchfilter'
})

@Injectable()
export class IssueTypeFilterPipe implements PipeTransform {
    transform(issuetypes: IssueType[], filterArgs: string): IssueType[] {
        if (!issuetypes) return [];
        else if(!filterArgs) return issuetypes;
        return issuetypes.filter(issuetype => 
            (issuetype.code.toLowerCase().indexOf(filterArgs.toLowerCase()) !== -1 ||
            issuetype.description.toLowerCase().indexOf(filterArgs.toLowerCase()) !== -1)
        );
      }
}