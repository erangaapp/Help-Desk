import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import swal from 'sweetalert2';

import { Issue, IssueRead } from '../../models/issue';
import { Staff } from '../../models/staff';
import { Resolution } from '../../models/resolution';

import { StaffService } from '../../services/staff.service';
import { IssueService } from '../../services/issue.service';
import { ResolutionService } from '../../services/resolution.service';

@Component({
  selector: 'app-resolutions.create',
  templateUrl: './resolutions.create.component.html',
  styleUrls: ['./resolutions.create.component.css']
})
export class ResolutionsCreateComponent implements OnInit {

  public issues: Array<IssueRead> = [];
  public staffs: Array<Staff> = [];

  modelForm: FormGroup;
  issue: FormControl;
  staff: FormControl;
  description: FormControl;

  constructor(private resolutionService: ResolutionService,
    private issueService: IssueService,
    private staffService: StaffService,
    private router: Router) { }

  ngOnInit() {

    this.createFormControls();
    this.createForm();

    this.issueService.get()
      .subscribe(models => this.issues = models);

    this.staffService.get()
      .subscribe(models => this.staffs = models);

  }

  createFormControls() {

    this.issue = new FormControl(Validators.required);
    this.staff = new FormControl(Validators.required);
    this.description = new FormControl('', Validators.required);
  }

  createForm() {
    this.modelForm = new FormGroup({
      issue: this.issue,
      staff: this.staff,
      description: this.description
    });
  }

  onSubmit() {

    if (this.modelForm.valid) {

      let issueId: number = this.modelForm.value['issue'];
      let staffId: number = this.modelForm.value['staff'];
      let description: string = this.modelForm.value['description'];

      this.resolutionService.post({ issueId: issueId, staffId: staffId, description: description } as Resolution)
        .subscribe(model => {

          swal({
            position: 'top-right',
            type: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
          });

          //Display the suucees toster notification
          this.router.navigate(['/resolutions-read']);

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

