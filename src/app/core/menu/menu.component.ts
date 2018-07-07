import { Component, OnInit, Input } from '@angular/core';
import { MatDrawer } from '@angular/material';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  user = 'Kartik';
  searchBoxVisible = false;

  @Input() sideBar: MatDrawer;

  constructor() {}

  ngOnInit() {}

  setSearchVisiblility(show: boolean) {
    this.searchBoxVisible = show;
  }
}
