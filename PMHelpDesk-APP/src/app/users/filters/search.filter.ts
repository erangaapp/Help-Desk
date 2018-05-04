import { Injectable, Pipe, PipeTransform } from '@angular/core';

import { User } from '../../models/user';

@Pipe({
    name: 'usersearchfilter'
})

@Injectable()
export class UserFilterPipe implements PipeTransform {
    transform(users: User[], filterArgs: string): User[] {
        if (!users) return [];
        else if(!filterArgs) return users;
        return users.filter(user => 
            (user.firstName.toLowerCase().indexOf(filterArgs.toLowerCase()) !== -1 ||
            user.lastName.toLowerCase().indexOf(filterArgs.toLowerCase()) !== -1 ||
            user.email.toLowerCase().indexOf(filterArgs.toLowerCase()) !== -1 ||
            user.phone.toLowerCase().indexOf(filterArgs.toLowerCase()) !== -1 ||
            user.address.toLowerCase().indexOf(filterArgs.toLowerCase()) !== -1)
        );
      }
}