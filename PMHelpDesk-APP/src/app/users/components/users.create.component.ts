import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ReactiveFormsModule,FormGroup,FormControl,Validators,FormBuilder } from '@angular/forms';

import swal from 'sweetalert2';

import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users.create',
  templateUrl: './users.create.component.html',
  styleUrls: ['./users.create.component.css']
})
export class UsersCreateComponent implements OnInit {

  modelForm: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  email: FormControl;
  phone: FormControl;
  address: FormControl;

  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {

    this.firstName = new FormControl('', Validators.required);
    this.lastName = new FormControl('', Validators.required);
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern("[^ @]*@[^ @]*")
    ]);
    this.phone = new FormControl('');
    this.address = new FormControl('');
  }

  createForm() {
    this.modelForm = new FormGroup({
      name: new FormGroup({
        firstName: this.firstName,
        lastName: this.lastName,
      }),
      contact: new FormGroup({
        email: this.email,
        phone: this.phone,
        address: this.address
      })
    });
  }

  onSubmit() {

    if (this.modelForm.valid) {
      
      let firstName:string = this.modelForm.value.name['firstName'];
      let lastName:string = this.modelForm.value.name['lastName'];
      let email:string = this.modelForm.value.contact['email'];
      let phone:string = this.modelForm.value.contact['phone'];
      let address:string = this.modelForm.value.contact['address'];

      this.userService.post({ firstName,lastName,email,phone,address } as User)
      .subscribe(model => {
        
        swal({
          position: 'top-right',
          type: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500
        });

        //Display the suucees toster notification
        this.router.navigate(['/users-read']);

      },error => {

        //Display the toaster error notification.
        swal({
          position: 'top-right',
          type: 'error',
          title: 'Error at saving',
          showConfirmButton: false,
          timer: 1500
        });

      });

    }

  }

}

