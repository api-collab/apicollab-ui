import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvatarModule } from 'ng2-avatar';
import { MenuComponent } from './menu.component';
import { SharedModule } from '../../shared';

@NgModule({
  imports: [CommonModule, SharedModule, AvatarModule],
  declarations: [MenuComponent],
  exports: [MenuComponent]
})
export class MenuModule {}
