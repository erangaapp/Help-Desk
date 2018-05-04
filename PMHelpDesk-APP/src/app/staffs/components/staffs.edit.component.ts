import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import swal from 'sweetalert2';

import { Staff } from '../../models/staff';
import { StaffService } from '../../services/staff.service';

@Component({
  selector: 'app-staffs.edit',
  templateUrl: './staffs.edit.component.html',
  styleUrls: ['./staffs.edit.component.css']
})
export class StaffsEditComponent implements OnInit {

  model: Staff;
  modelForm: FormGroup;
  name: FormControl;
  email: FormControl;
  phone: FormControl;
  address: FormControl;

  constructor(private staffService: StaffService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {

    this.createFormControls();
    this.createForm();

    this.getStaff();

  }

  getStaff(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.staffService.getStaff(id)
      .subscribe(model => {

        this.model = model;

        if (this.model) {

          this.name.setValue(this.model.name);
          this.email.setValue(this.model.email);
          this.phone.setValue(this.model.phone);
          this.address.setValue(this.model.address);
          
        }

      });
  }

  createFormControls() {

    this.name = new FormControl('', Validators.required);
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
        name: this.name,
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

      let name: string = this.modelForm.value.name['name'];
      let email: string = this.modelForm.value.contact['email'];
      let phone: string = this.modelForm.value.contact['phone'];
      let address: string = this.modelForm.value.contact['address'];

      this.staffService.put(new Staff(this.model.id, name, email, phone, address))
        .subscribe(staff => {

          swal({
            position: 'top-right',
            type: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
          });

          //Display the suucees toster notification
          this.router.navigate(['/staffs-read']);

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

