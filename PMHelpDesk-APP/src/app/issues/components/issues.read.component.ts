import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { forkJoin } from "rxjs/observable/forkJoin";

import { getDate, addDays } from '@progress/kendo-date-math';
import { GridComponent, GridDataResult, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';

import swal from 'sweetalert2';

import { IssueFilterPipe } from '../filters/search.filter';

import { IssueType } from '../../models/issuetype';
import { User } from '../../models/user';
import { Issue, IssueRead } from '../../models/issue';

import { IssueService } from '../../services/issue.service';

const formGroup = dataItem => new FormGroup({
  'id': new FormControl(dataItem.id),
  'issueTypeId': new FormControl(dataItem.issueTypeId, Validators.required),
  'userId': new FormControl(dataItem.userId, Validators.required),
  'dateReported': new FormControl(dataItem.dateReported, Validators.required),
  'dateResolved': new FormControl(dataItem.dateResolved),
  'description': new FormControl(dataItem.description, Validators.required)
});

@Component({
  selector: 'app-issues.read',
  templateUrl: './issues.read.component.html',
  styleUrls: ['./issues.read.component.css']
})
export class IssuesReadComponent implements OnInit {

  users: User[] = [];
  issueTypes: IssueType[] = [];
  models: IssueRead[] = [];

  //public gridData: any[];
  public formGroup: FormGroup;
  private editedRowIndex: number;

  constructor(private issueService: IssueService,
    private router: Router) { }

  ngOnInit() {

    this.issueService.
      getForkJoins().
      subscribe(results => {

        this.users = results[0] as User[];
        this.issueTypes = results[1] as IssueType[];

        this.getIssues();

      });

  }

  getIssues(): void {
    this.issueService.get()
      .subscribe(models => {

        this.models = models;
        let temp: IssueRead[] = [];

        this.models.forEach(element => {

          if (this.users.find(u => u.id === element.userId) && this.issueTypes.find(u => u.id === element.issueTypeId)) {

            element.user = this.users.find(u => u.id === element.userId).firstName + " " + this.users.find(u => u.id === element.userId).lastName;
            element.issueType = this.issueTypes.find(u => u.id === element.issueTypeId).code;

            temp.push(element);
          }

        });

        this.models = temp;
        this.gridData = this.models;

      });
  }

  delete(id: number): void {

    swal({
      title: 'Are you sure?',
      text: 'You will not be able to recover this issue!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    }).then((result) => {

      if (result.value) {

        let issue = this.models.find(f => f.id === id);

        this.models = this.models.filter(h => h !== issue);
        this.issueService.delete(new Issue(issue.id, issue.issueTypeId, issue.userId, issue.dateReported, issue.description, issue.dateResolved)).subscribe(_ => {

          this.gridData = this.models;

          swal(
            'Deleted!',
            'Issue has been deleted.',
            'success'
          );
        });

      }

    });

  };

  edit(id: number): void {

    this.router.navigate(['/issues-edit/' + id]);

  };

  public gridData: any[];

  public issueType(id: number): any {

    let _issueType = this.issueTypes.find(x => x.id === id);
    return _issueType ? _issueType.code + " " + _issueType.description : '';
  }

  public user(id: number): any {

    let _user = this.users.find(x => x.id === id);
    return _user ? _user.firstName + " " + _user.lastName : '';
  }

  public addHandler({ sender }) {
    this.closeEditor(sender);

    this.formGroup = formGroup({
      'description': "",
      'dateReported': new Date(),
      'dateResolved': "",
      'userId': "",
      "issueTypeId": ""
    });

    sender.addRow(this.formGroup);
  }

  public editHandler({ sender, rowIndex, dataItem }) {
    this.closeEditor(sender);

    dataItem.dateReported = new Date(dataItem.dateReported);
    dataItem.dateResolved = dataItem.dateResolved ? new Date(dataItem.dateResolved) : "";

    this.formGroup = formGroup(dataItem);

    this.editedRowIndex = rowIndex;

    sender.editRow(rowIndex, this.formGroup);
  }

  public cancelHandler({ sender, rowIndex }) {
    this.closeEditor(sender, rowIndex);
  }

  public saveHandler({ sender, rowIndex, formGroup, isNew }): void {
    const _model = formGroup.value as Issue;

    sender.closeRow(rowIndex);

    if (isNew) {

      this.issueService.post({ issueTypeId: _model.issueTypeId, userId: _model.userId, dateReported: _model.dateReported, dateResolved: _model.dateResolved, description: _model.description } as Issue)
        .subscribe(model => {

          this.gridData.push(model);

          swal({
            position: 'top-right',
            type: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
          });

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

    } else {

      this.issueService.put({ id: _model.id, issueTypeId: _model.issueTypeId, userId: _model.userId, dateReported: _model.dateReported, dateResolved: _model.dateResolved, description: _model.description } as Issue)
        .subscribe(model => {

          this.models.find(h => h.id === _model.id).dateReported = new Date(_model.dateReported);
          this.models.find(h => h.id === _model.id).dateResolved = _model.dateResolved ? new Date(_model.dateResolved) : null;
          this.models.find(h => h.id === _model.id).userId = _model.userId;
          this.models.find(h => h.id === _model.id).issueTypeId = _model.issueTypeId;
          this.models.find(h => h.id === _model.id).description = _model.description;

          this.gridData = this.models

          //Display the suucees toster notification
          swal({
            position: 'top-right',
            type: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
          });


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

  private closeEditor(grid, rowIndex = this.editedRowIndex) {
    grid.closeRow(rowIndex);
    this.editedRowIndex = undefined;
    this.formGroup = undefined;
  }

}
