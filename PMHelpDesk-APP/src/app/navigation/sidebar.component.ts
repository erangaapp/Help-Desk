import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-sidebar',
  template: `<cuppa-slidemenu [menulist]="menuItemsArray" [config]="menuConfig" (open)="onMenuOpen()" (close)="onMenuClose()" (onItemSelect)="onItemSelect($event)"></cuppa-slidemenu>`,
  styleUrls: ['./sidebar.component.css']
})
export class SideBarComponent {

  constructor(private router: Router) { }

  state;
  show() {
    this.state = 'active';
  }
  hide() {
    this.state = 'inactive';
  }

  menuConfig: any = {
    "animation": "collapse",
    "offset": {
      "top": 65
    },
    closeOnCLick: true
  };

  public menuItemsArray: any[] = [
    { "title": "Dashboard", "link": "/" },
    {
      "title": "Setup", "link": "#",
      "subItems": [
        { "title": "Users", "link": "/users-read" },
        { "title": "Issue Types", "link": "/issuetypes-read" },
        { "title": "Staffs", "link": "/staffs-read" }
      ]
    },
    {
      "title": "Transactions", "link": "#",
      "subItems": [
        { "title": "Issues", "link": "/issues-read" },
        { "title": "Issue Relationships", "link": "/issuerelationships-read" },
        { "title": "Resolutions", "link": "/resolutions-read" }
      ]
    },
  ];

  public onMenuClose() {
    //console.log("menu closed");
  }
  public onMenuOpen() {
    //console.log("menu Opened");
  }
  public onItemSelect(item: any) {
    this.router.navigate([item.link]);
  }

}

