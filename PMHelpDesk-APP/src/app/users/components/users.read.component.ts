import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import swal from 'sweetalert2';

import { UserFilterPipe } from '../filters/search.filter';

import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users.read',
  templateUrl: './users.read.component.html',
  styleUrls: ['./users.read.component.css']
})
export class UsersReadComponent implements OnInit {
  models: User[];
  filterQuery:string;

  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.get()
      .subscribe(models => this.models = models);
  }

  delete(event: Event, id: number): void {

    event.preventDefault();
    swal({
      title: 'Are you sure?',
      text: 'You will not be able to recover this user!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    }).then((result) => {

      if (result.value) {

        let user = this.models.find(f => f.id === id);
        
        this.models = this.models.filter(h => h !== user);
        this.userService.delete(user).subscribe(_ => {
          swal(
            'Deleted!',
            'User has been deleted.',
            'success'
          )
        });

      }

    });

  }

}
