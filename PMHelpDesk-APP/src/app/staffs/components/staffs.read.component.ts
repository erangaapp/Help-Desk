import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import swal from 'sweetalert2';

import { StaffFilterPipe } from '../filters/search.filter';

import { Staff } from '../../models/staff';
import { StaffService } from '../../services/staff.service';

@Component({
  selector: 'app-staffs.read',
  templateUrl: './staffs.read.component.html',
  styleUrls: ['./staffs.read.component.css']
})
export class StaffsReadComponent implements OnInit {
  models: Staff[];
  filterQuery:string;

  constructor(private staffService: StaffService,
    private router: Router) { }

  ngOnInit() {
    this.getStaffs();
  }

  getStaffs(): void {
    this.staffService.get()
      .subscribe(models => this.models = models);
  }

  delete(event: Event, id: number): void {

    event.preventDefault();
    swal({
      title: 'Are you sure?',
      text: 'You will not be able to recover this staff!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    }).then((result) => {

      if (result.value) {

        let staff = this.models.find(f => f.id === id);
        
        this.models = this.models.filter(h => h !== staff);
        this.staffService.delete(staff).subscribe(_ => {
          swal(
            'Deleted!',
            'Staff has been deleted.',
            'success'
          )
        });

      }

    });

  }

}
