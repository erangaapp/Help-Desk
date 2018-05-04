import { Injectable, Pipe, PipeTransform } from '@angular/core';

import { Issue } from '../../models/issue';

@Pipe({
    name: 'issuesearchfilter'
})

@Injectable()
export class IssueFilterPipe implements PipeTransform {
    transform(issues: Issue[], filterArgs: string): Issue[] {
        if (!issues) return [];
        else if(!filterArgs) return issues;
        return issues.filter(issue => 
            (issue.description.toLowerCase().indexOf(filterArgs.toLowerCase()) !== -1 || 
            issue.dateReported.toString().toLowerCase() === filterArgs.toLowerCase() || 
            issue.dateResolved && issue.dateResolved.toString().toLowerCase() === filterArgs.toLowerCase() || 
            issue.user && issue.user.firstName.toLowerCase().indexOf(filterArgs.toLowerCase()) !== -1 ||
            issue.user && issue.user.lastName.toLowerCase().indexOf(filterArgs.toLowerCase()) !== -1 ||
            issue.user && issue.user.email.toLowerCase().indexOf(filterArgs.toLowerCase()) !== -1 ||
            issue.user && issue.user.phone.toLowerCase().indexOf(filterArgs.toLowerCase()) !== -1 ||
            issue.user && issue.user.address.toLowerCase().indexOf(filterArgs.toLowerCase()) !== -1 ||
            issue.issueType && issue.issueType.code.toLowerCase().indexOf(filterArgs.toLowerCase()) !== -1||
            issue.issueType && issue.issueType.description.toLowerCase().indexOf(filterArgs.toLowerCase()) !== -1)
        );
      }
}