import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import swal from 'sweetalert2';

import { IssueRead } from '../../models/issue';
import { IssueRelationship, IssueRelationshipRead } from '../../models/issuerelationship';

import { IssueService } from '../../services/issue.service';
import { IssueRelationshipService } from '../../services/issuerelationship.service';

@Component({
  selector: 'app-issuerelationships.edit',
  templateUrl: './issuerelationships.edit.component.html',
  styleUrls: ['./issuerelationships.edit.component.css']
})
export class IssueRelationshipsEditComponent implements OnInit {

  public issues: Array<IssueRead> = [];
  public relatedIssues: Array<IssueRead> = [];

  model: IssueRelationship;

  modelForm: FormGroup;
  issue: FormControl;
  relatedIssue: FormControl;
  dateRelated: FormControl;

  constructor(private issueRelationshipService: IssueRelationshipService,
    private issueService: IssueService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {

    this.createFormControls();
    this.createForm();

    this.issueService.get()
      .subscribe(models => {
        this.relatedIssues = models;
        this.issues = models;

        this.getIssueRelationship();

      });

  }

  createFormControls() {

    this.issue = new FormControl(Validators.required);
    this.relatedIssue = new FormControl(Validators.required);
    this.dateRelated = new FormControl(new Date(), Validators.required);

  }

  createForm() {
    this.modelForm = new FormGroup({
      issue: this.issue,
      relatedIssue: this.relatedIssue,
      dateRelated: this.dateRelated
    });
  }

  getIssueRelationship(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.issueRelationshipService.getIssue(id)
      .subscribe(model => {

        this.model = model as IssueRelationshipRead;

        if (this.model) {

          let _dateRelated = new Date(this.model.dateRelated);

          this.issue.setValue(this.model.issueId);
          this.relatedIssue.setValue(this.model.relatedIssueId);
          this.dateRelated.setValue(_dateRelated);

        }

      });
  }

  onSubmit() {

    if (this.modelForm.valid) {

      let issueId: number = this.modelForm.value['issue'];
      let relatedIssueId: number = this.modelForm.value['relatedIssue'];
      let dateRelated: Date = this.modelForm.value['dateRelated'];

      this.issueRelationshipService.post({ id: this.model.id, issueId: issueId, relatedIssueId: relatedIssueId, dateRelated: dateRelated } as IssueRelationship)
        .subscribe(model => {

          swal({
            position: 'top-right',
            type: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
          });

          //Display the suucees toster notification
          this.router.navigate(['/issuerelationships-read']);

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

