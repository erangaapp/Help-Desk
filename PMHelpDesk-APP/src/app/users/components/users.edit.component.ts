import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import swal from 'sweetalert2';

import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users.edit',
  templateUrl: './users.edit.component.html',
  styleUrls: ['./users.edit.component.css']
})
export class UsersEditComponent implements OnInit {

  model: User;
  modelForm: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  email: FormControl;
  phone: FormControl;
  address: FormControl;

  constructor(private userService: UserService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {

    this.createFormControls();
    this.createForm();

    this.getUser();

  }

  getUser(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.getUser(id)
      .subscribe(model => {

        this.model = model;

        this.firstName.setValue(this.model.firstName);
        this.lastName.setValue(this.model.lastName);
        this.email.setValue(this.model.email);
        this.phone.setValue(this.model.phone);
        this.address.setValue(this.model.address);

      });
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

      let firstName: string = this.modelForm.value.name['firstName'];
      let lastName: string = this.modelForm.value.name['lastName'];
      let email: string = this.modelForm.value.contact['email'];
      let phone: string = this.modelForm.value.contact['phone'];
      let address: string = this.modelForm.value.contact['address'];

      this.userService.put(new User(this.model.id, firstName, lastName, email, phone, address))
        .subscribe(user => {

          swal({
            position: 'top-right',
            type: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
          });

          //Display the suucees toster notification
          this.router.navigate(['/users-read']);

        }, error => {

          //Display the toaster error notification.
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

