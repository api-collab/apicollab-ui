import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared';
import { SidebarModule } from './sidebar/sidebar.module';
import { NotificationModule } from './notification/notification.module';
import { MenuModule } from './menu/menu.module';
import { ErrorsModule } from './errors/errors.module';
import { ApiInfoService } from './services/api-info/api-info.service';
import { NotificationService } from './services/notification/notification.service';
import { Title } from '@angular/platform-browser';

@NgModule({
  imports: [CommonModule, SharedModule, SidebarModule, MenuModule, ErrorsModule],
  exports: [SidebarModule, MenuModule, ErrorsModule, NotificationModule],
  declarations: [],
  providers: [ApiInfoService, NotificationService, Title]
})
export class CoreModule {}
