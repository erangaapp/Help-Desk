import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard/dashboard.component';

import { UsersReadComponent }      from './users/components/users.read.component';
import { UsersCreateComponent }      from './users/components/users.create.component';
import { UsersEditComponent }      from './users/components/users.edit.component';

import { IssueTypesReadComponent }      from './issuetypes/components/issuetypes.read.component';
import { IssueTypesCreateComponent }      from './issuetypes/components/issuetypes.create.component';
import { IssueTypesEditComponent }      from './issuetypes/components/issuetypes.edit.component';

import { StaffsReadComponent }      from './staffs/components/staffs.read.component';
import { StaffsCreateComponent }      from './staffs/components/staffs.create.component';
import { StaffsEditComponent }      from './staffs/components/staffs.edit.component';

import { IssuesReadComponent }      from './issues/components/issues.read.component';
import { IssuesCreateComponent }      from './issues/components/issues.create.component';
import { IssuesEditComponent }      from './issues/components/issues.edit.component';

import { IssueRelationshipsReadComponent }  from './issuerelationships/components/issuerelationships.read.component';
import { IssueRelationshipsCreateComponent }  from './issuerelationships/components/issuerelationships.create.component';
import { IssueRelationshipsEditComponent }  from './issuerelationships/components/issuerelationships.edit.component';

import { ResolutionsReadComponent }  from './resolutions/components/resolutions.read.component';
import { ResolutionsCreateComponent }  from './resolutions/components/resolutions.create.component';
import { ResolutionsEditComponent }  from './resolutions/components/resolutions.edit.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'users-read', component: UsersReadComponent },
  { path: 'users-create', component: UsersCreateComponent },
  { path: 'users-edit/:id', component: UsersEditComponent},
  { path: 'issuetypes-read', component: IssueTypesReadComponent },
  { path: 'issuetypes-create', component: IssueTypesCreateComponent },
  { path: 'issuetypes-edit/:id', component: IssueTypesEditComponent},
  { path: 'staffs-read', component: StaffsReadComponent },
  { path: 'staffs-create', component: StaffsCreateComponent },
  { path: 'staffs-edit/:id', component: StaffsEditComponent},
  { path: 'issues-read', component: IssuesReadComponent },
  { path: 'issues-create', component: IssuesCreateComponent },
  { path: 'issues-edit/:id', component: IssuesEditComponent},
  { path: 'issuerelationships-read', component: IssueRelationshipsReadComponent },
  { path: 'issuerelationships-create', component: IssueRelationshipsCreateComponent },
  { path: 'issuerelationships-edit/:id', component: IssueRelationshipsEditComponent},

  { path: 'resolutions-read', component: ResolutionsReadComponent },
  { path: 'resolutions-create', component: ResolutionsCreateComponent },
  { path: 'resolutions-edit/:id', component: ResolutionsEditComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
