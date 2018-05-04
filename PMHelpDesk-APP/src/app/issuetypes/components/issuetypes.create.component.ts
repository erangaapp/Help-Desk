import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import swal from 'sweetalert2';

import { IssueType } from '../../models/issuetype';
import { IssueTypeService } from '../../services/issuetype.service';

@Component({
  selector: 'app-issuetypes.create',
  templateUrl: './issuetypes.create.component.html',
  styleUrls: ['./issuetypes.create.component.css']
})
export class IssueTypesCreateComponent implements OnInit {

  modelForm: FormGroup;
  code: FormControl;
  description: FormControl;

  constructor(private issuetypeService: IssueTypeService,
    private router: Router) { }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {

    this.code = new FormControl('', Validators.required);
    this.description = new FormControl('', Validators.required);
  }

  createForm() {
    this.modelForm = new FormGroup({
      code: new FormGroup({
        code: this.code,
      }),
      description: new FormGroup({
        description: this.description
      })
    });
  }

  onSubmit() {

    if (this.modelForm.valid) {

      let code: string = this.modelForm.value.code['code'];
      let description: string = this.modelForm.value.description['description'];

      this.issuetypeService.post({ code, description } as IssueType)
        .subscribe(model => {

          swal({
            position: 'top-right',
            type: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
          });

          //Display the suucees toster notification
          this.router.navigate(['/issuetypes-read']);

        }, error => {

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

