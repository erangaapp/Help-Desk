import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import swal from 'sweetalert2';

import { IssueTypeFilterPipe } from '../filters/search.filter';

import { IssueType } from '../../models/issuetype';
import { IssueTypeService } from '../../services/issuetype.service';

@Component({
  selector: 'app-issuetypes.read',
  templateUrl: './issuetypes.read.component.html',
  styleUrls: ['./issuetypes.read.component.css']
})
export class IssueTypesReadComponent implements OnInit {
  models: IssueType[];
  filterQuery:string;

  constructor(private issuetypeService: IssueTypeService,
    private router: Router) { }

  ngOnInit() {
    this.getIssueTypes();
  }

  getIssueTypes(): void {
    this.issuetypeService.get()
      .subscribe(models => this.models = models);
  }

  delete(event: Event, id: number): void {

    event.preventDefault();
    swal({
      title: 'Are you sure?',
      text: 'You will not be able to recover this issuetype!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    }).then((result) => {

      if (result.value) {

        let issuetype = this.models.find(f => f.id === id);
        
        this.models = this.models.filter(h => h !== issuetype);
        this.issuetypeService.delete(issuetype).subscribe(_ => {
          swal(
            'Deleted!',
            'IssueType has been deleted.',
            'success'
          )
        });

      }

    });

  }

}
