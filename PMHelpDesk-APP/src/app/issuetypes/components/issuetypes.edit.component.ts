import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import swal from 'sweetalert2';

import { IssueType } from '../../models/issuetype';
import { IssueTypeService } from '../../services/issuetype.service';

@Component({
  selector: 'app-issuetypes.edit',
  templateUrl: './issuetypes.edit.component.html',
  styleUrls: ['./issuetypes.edit.component.css']
})
export class IssueTypesEditComponent implements OnInit {

  model: IssueType;
  modelForm: FormGroup;
  code: FormControl;
  description: FormControl;

  constructor(private issuetypeService: IssueTypeService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {

    this.createFormControls();
    this.createForm();

    this.getIssueType();

  }

  getIssueType(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.issuetypeService.getIssueType(id)
      .subscribe(model => {

        this.model = model;

        if (this.model) {

          this.code.setValue(this.model.code);
          this.description.setValue(this.model.description);

        }

      });
  }

  createFormControls() {

    this.code = new FormControl('', Validators.required);
    this.code.disable();
    
    this.description = new FormControl('', Validators.required);

  }

  createForm() {
    this.modelForm = new FormGroup({
      code: new FormGroup({
        code: this.code
      }),
      description: new FormGroup({
        description: this.description
      })
    });
  }

  onSubmit() {

    if (this.modelForm.valid) {

      let description: string = this.modelForm.value.description['description'];

      this.issuetypeService.put(new IssueType(this.model.id, this.model.code, description))
        .subscribe(issuetype => {

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

