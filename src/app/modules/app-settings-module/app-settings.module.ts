import { DxDataGridModule } from 'devextreme-angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppSettingsModuleComponent } from './app-settings.component';
import { AppSettingsRoutingModule, menu } from './app-settings-routing.module';
import { ConfigListaInventarComponent } from './config-lista-inventar/config-lista-inventar.component';

@NgModule({
  imports: [
    CommonModule,
    AppSettingsRoutingModule,
    DxDataGridModule
  ],
  declarations: [AppSettingsModuleComponent, ConfigListaInventarComponent]
})
export class AppSettingsModuleModule {
  getMenu() {
    return menu;
  }
}
