import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { forkJoin } from "rxjs/observable/forkJoin";

import { getDate, addDays } from '@progress/kendo-date-math';
import { GridComponent, GridDataResult, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';

import swal from 'sweetalert2';

import { IssueRead } from '../../models/issue';
import { Staff } from '../../models/staff';
import { Resolution, ResolutionRead } from '../../models/resolution';

import { ResolutionService } from '../../services/resolution.service';

@Component({
  selector: 'app-resolutions.read',
  templateUrl: './resolutions.read.component.html',
  styleUrls: ['./resolutions.read.component.css']
})
export class ResolutionsReadComponent implements OnInit {

  staffs: Staff[] = [];
  issues: IssueRead[] = [];
  models: ResolutionRead[] = [];

  constructor(private resolutionService: ResolutionService,
    private router: Router) { }

  ngOnInit() {

    this.resolutionService.
      getForkJoins().
      subscribe(results => {

        this.staffs = results[0] as Staff[];
        this.issues = results[1] as IssueRead[];

        this.getResolutions();

      });

  }

  getResolutions(): void {
    this.resolutionService.get()
      .subscribe(models => {

        this.models = models;
        let temp: ResolutionRead[] = [];

        this.models.forEach(element => {

          if (this.staffs.find(u => u.id === element.staffId) && this.issues.find(u => u.id === element.issueId)) {

            element.staff = this.staffs.find(u => u.id === element.staffId).name;
            element.issue = this.issues.find(u => u.id === element.issueId).description;

            temp.push(element);
          }

        });

        this.models = temp;
        this.gridData = process(this.models, this.state);

      });
  }

  delete(id: number): void {

    swal({
      title: 'Are you sure?',
      text: 'You will not be able to recover this resolution!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    }).then((result) => {

      if (result.value) {

        let resolution = this.models.find(f => f.id === id);

        this.models = this.models.filter(h => h !== resolution);
        this.resolutionService.delete(new Resolution(resolution.id, resolution.issueId, resolution.staffId, resolution.description)).subscribe(_ => {

          this.gridData = process(this.models, this.state);

          swal(
            'Deleted!',
            'Resolution has been deleted.',
            'success'
          );
        });

      }

    });

  };

  edit(id: number): void {

    this.router.navigate(['/resolutions-edit/' + id]);

  };

  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.gridData = process(this.models, this.state);
  }

  public state: State = {
    skip: 0,
    take: 50
  };

  public gridData: GridDataResult = process(this.models, this.state);

}
