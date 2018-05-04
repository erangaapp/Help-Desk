import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import swal from 'sweetalert2';

import { IssueType } from '../../models/issueType';
import { User } from '../../models/user';
import { Issue } from '../../models/issue';

import { UserService } from '../../services/user.service';
import { IssueTypeService } from '../../services/issuetype.service';
import { IssueService } from '../../services/issue.service';

@Component({
  selector: 'app-issues.create',
  templateUrl: './issues.create.component.html',
  styleUrls: ['./issues.create.component.css']
})
export class IssuesCreateComponent implements OnInit {

  public issueTypes: Array<IssueType> = [];
  public users: Array<User> = [];

  modelForm: FormGroup;
  issueType: FormControl;
  user: FormControl;
  dateReported: FormControl;
  dateResolved: FormControl;
  description: FormControl;

  constructor(private issueService: IssueService,
    private issueTypeService: IssueTypeService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {

    this.createFormControls();
    this.createForm();

    this.issueTypeService.get()
      .subscribe(models => this.issueTypes = models);

    this.userService.get()
      .subscribe(models => this.users = models);

  }

  createFormControls() {

    this.issueType = new FormControl(Validators.required);
    this.user = new FormControl(Validators.required);
    this.dateReported = new FormControl(new Date(), Validators.required);
    this.dateResolved = new FormControl();
    this.description = new FormControl('', Validators.required);
  }

  createForm() {
    this.modelForm = new FormGroup({
      issueType: this.issueType,
      user: this.user,
      dateReported: this.dateReported,
      dateResolved: this.dateResolved,
      description: this.description
    });
  }

  onSubmit() {

    if (this.modelForm.valid) {

      let issueTypeId: number = this.modelForm.value['issueType'];
      let userId: number = this.modelForm.value['user'];
      let dateReported: Date = this.modelForm.value['dateReported'];
      let dateResolved: Date = this.modelForm.value['dateResolved'];
      let description: string = this.modelForm.value['description'];

      this.issueService.post({ issueTypeId: issueTypeId, userId: userId, dateReported: dateReported, dateResolved: dateResolved, description: description } as Issue)
        .subscribe(model => {

          swal({
            position: 'top-right',
            type: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
          });

          //Display the suucees toster notification
          this.router.navigate(['/issues-read']);

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

