import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule,FormsModule,FormGroup,FormControl,Validators,FormBuilder } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { SlideMenuModule } from 'cuppa-ng2-slidemenu/cuppa-ng2-slidemenu';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

//## Kendo UI modules ##

import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { IntlModule } from '@progress/kendo-angular-intl';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { GridModule } from '@progress/kendo-angular-grid';
import { PopupModule } from '@progress/kendo-angular-popup';

//######################

import { DashboardComponent } from './dashboard/dashboard.component';

import { UserService } from './services/user.service';
import { UsersReadComponent } from './users/components/users.read.component';
import { UsersCreateComponent } from './users/components/users.create.component';
import { UsersEditComponent } from './users/components/users.edit.component';
import { UserFilterPipe } from './users/filters/search.filter';

import { IssueTypeService } from './services/issuetype.service';
import { IssueTypesReadComponent }      from './issuetypes/components/issuetypes.read.component';
import { IssueTypesCreateComponent }      from './issuetypes/components/issuetypes.create.component';
import { IssueTypesEditComponent }      from './issuetypes/components/issuetypes.edit.component';
import { IssueTypeFilterPipe } from './issuetypes/filters/search.filter';

import { StaffService } from './services/staff.service';
import { StaffsReadComponent }      from './staffs/components/staffs.read.component';
import { StaffsCreateComponent }      from './staffs/components/staffs.create.component';
import { StaffsEditComponent }      from './staffs/components/staffs.edit.component';
import { StaffFilterPipe } from './staffs/filters/search.filter';

import { IssueService } from './services/issue.service';
import { IssuesReadComponent }      from './issues/components/issues.read.component';
import { IssuesCreateComponent }      from './issues/components/issues.create.component';
import { IssuesEditComponent }      from './issues/components/issues.edit.component';
import { IssueFilterPipe } from './issues/filters/search.filter';

import { IssueRelationshipService } from './services/issuerelationship.service';
import { IssueRelationshipsReadComponent }  from './issuerelationships/components/issuerelationships.read.component';
import { IssueRelationshipsCreateComponent }  from './issuerelationships/components/issuerelationships.create.component';
import { IssueRelationshipsEditComponent }  from './issuerelationships/components/issuerelationships.edit.component';

import { ResolutionService } from './services/resolution.service';
import { ResolutionsReadComponent }  from './resolutions/components/resolutions.read.component';
import { ResolutionsCreateComponent }  from './resolutions/components/resolutions.create.component';
import { ResolutionsEditComponent }  from './resolutions/components/resolutions.edit.component';

import { SideBarComponent } from './navigation/sidebar.component';
import { TopBarComponent } from './navigation/topbar.component';

import { MessageService } from './services/message.service';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,FormsModule,
    AppRoutingModule,
    HttpClientModule,
    SlideMenuModule,

    BrowserAnimationsModule,
    ButtonsModule,
    IntlModule, DateInputsModule, LabelModule,
    DropDownsModule,
    GridModule,
    PopupModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  declarations: [
    AppComponent,
    
    SideBarComponent,
    TopBarComponent,

    DashboardComponent,

    UsersReadComponent,
    UsersCreateComponent,
    UsersEditComponent,
    UserFilterPipe,

    IssueTypesReadComponent,
    IssueTypesCreateComponent,
    IssueTypesEditComponent,
    IssueTypeFilterPipe,

    StaffsReadComponent,
    StaffsCreateComponent,
    StaffsEditComponent,
    StaffFilterPipe,

    IssuesReadComponent,
    IssuesCreateComponent,
    IssuesEditComponent,
    IssueFilterPipe,

    IssueRelationshipsReadComponent,
    IssueRelationshipsCreateComponent,
    IssueRelationshipsEditComponent,

    ResolutionsReadComponent,
    ResolutionsCreateComponent,
    ResolutionsEditComponent
    
  ],
  providers: [ MessageService, UserService, IssueTypeService, StaffService, IssueService , IssueRelationshipService, ResolutionService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }