import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { forkJoin } from "rxjs/observable/forkJoin";

import { getDate, addDays } from '@progress/kendo-date-math';
import { GridComponent, GridDataResult, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';

import swal from 'sweetalert2';

import { Issue } from '../../models/issue';
import { IssueRelationship, IssueRelationshipRead } from '../../models/issuerelationship';

import { IssueRelationshipService } from '../../services/issuerelationship.service';

@Component({
  selector: 'app-issuerelationships.read',
  templateUrl: './issuerelationships.read.component.html',
  styleUrls: ['./issuerelationships.read.component.css']
})
export class IssueRelationshipsReadComponent implements OnInit {

  issues: Issue[] = [];
  relatedIssues: Issue[] = [];
  models: IssueRelationshipRead[] = [];

  constructor(private issueRelationshipService: IssueRelationshipService,
    private router: Router) { }

  ngOnInit() {

    this.issueRelationshipService.
      getForkJoins().
      subscribe(results => {

        this.issues = results[0] as Issue[];
        this.relatedIssues = results[0] as Issue[];

        this.getIssues();

      });

  }

  getIssues(): void {
    this.issueRelationshipService.get()
      .subscribe(models => {

        this.models = models;
        let temp: IssueRelationshipRead[] = [];

        this.models.forEach(element => {

          if (this.issues.find(u => u.id === element.issueId) && this.relatedIssues.find(u => u.id === element.relatedIssueId)) {

            element.issue = this.issues.find(u => u.id === element.issueId).description;
            element.relatedIssue = this.relatedIssues.find(u => u.id === element.relatedIssueId).description;

            temp.push(element);

          }

          this.models = temp;
          this.gridData = process(this.models, this.state);

        });

      });
  }

  delete(id: number): void {

    swal({
      title: 'Are you sure?',
      text: 'You will not be able to recover this issue relationship!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    }).then((result) => {

      if (result.value) {

        let issueRelationship = this.models.find(f => f.id === id);

        this.models = this.models.filter(h => h !== issueRelationship);
        this.issueRelationshipService.delete(new IssueRelationship(issueRelationship.id, issueRelationship.issueId, issueRelationship.relatedIssueId, issueRelationship.dateRelated)).subscribe(_ => {

          this.gridData = process(this.models, this.state);

          swal(
            'Deleted!',
            'Issue relationship has been deleted.',
            'success'
          );

        });

      }

    });

  };

  edit(id: number): void {

    this.router.navigate(['/issuerelationships-edit/' + id]);

  };

  public state: State = {
    skip: 0,
    take: 50
  };

  public gridData: GridDataResult = process(this.models, this.state);

  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.gridData = process(this.models, this.state);
  }

}
