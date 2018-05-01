import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatDrawer } from '@angular/material';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() sideBar: MatDrawer;
  items = [
    {
      name: 'Explore',
      icon: 'explore',
      url: '/'
    },
    // {
    //   name: 'My Workspaces',
    //   icon: 'folder',
    //   url: 'https://raw.githubusercontent.com/OAI/OpenAPI-Specification/master/examples/v3.0/uspto.yaml'
    // }
  ];
  constructor(private router: Router) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {

        this.sideBar.close();
      }
    });
  }

  ngOnInit() {
  }

}
