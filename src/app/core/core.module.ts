import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared';
import { ApiInfoService } from './services/api-info/api-info.service';
import { SidebarModule } from './sidebar/sidebar.module';
import { MenuModule } from './menu/menu.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SidebarModule,
    MenuModule
  ],
  exports: [
    SidebarModule,
    MenuModule
  ],
  declarations: [
  ],
  providers: [
    ApiInfoService,
  ]
})
export class CoreModule { }
