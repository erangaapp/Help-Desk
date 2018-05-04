import { Injectable, Pipe, PipeTransform } from '@angular/core';

import { Staff } from '../../models/staff';

@Pipe({
    name: 'staffsearchfilter'
})

@Injectable()
export class StaffFilterPipe implements PipeTransform {
    transform(staffs: Staff[], filterArgs: string): Staff[] {
        if (!staffs) return [];
        else if(!filterArgs) return staffs;
        return staffs.filter(staff => 
            (staff.name.toLowerCase().indexOf(filterArgs.toLowerCase()) !== -1||
            staff.address.toLowerCase().indexOf(filterArgs.toLowerCase()) !== -1||
            staff.email.toLowerCase().indexOf(filterArgs.toLowerCase()) !== -1||
            staff.phone.toLowerCase().indexOf(filterArgs.toLowerCase()) !== -1)
        );
      }
}
