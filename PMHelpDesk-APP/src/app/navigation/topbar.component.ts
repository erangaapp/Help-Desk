import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
    selector: 'app-topbar',
    template: `<a class="navbar-brand" href="/">
              {{title}}
            </a>`,
    styleUrls: ['./topbar.component.css']
})
export class TopBarComponent {
    title = 'PM Help Desk';
}
