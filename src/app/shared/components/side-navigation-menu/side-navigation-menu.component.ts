import { Component, NgModule, Output, Input, EventEmitter, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { ItemClickEvent } from 'devextreme/ui/tree_view';
import { DxTreeViewModule, DxTreeViewComponent } from 'devextreme-angular/ui/tree-view';
import { navigation, Navigation } from '../../../app-navigation';

import * as events from 'devextreme/events';
import { TitleStrategy } from '@angular/router';

@Component({
  selector: 'app-side-navigation-menu',
  templateUrl: './side-navigation-menu.component.html',
  styleUrls: ['./side-navigation-menu.component.scss']
})
export class SideNavigationMenuComponent implements AfterViewInit, OnDestroy {
  @ViewChild(DxTreeViewComponent, { static: true })
  menu!: DxTreeViewComponent;
  modulesNavigation:Navigation = new Navigation();
  @Output()
  selectedItemChanged = new EventEmitter<ItemClickEvent>();

  @Output()
  openMenu = new EventEmitter<any>();

  private _selectedItem!: String;
  @Input()
  set selectedItem(value: String) {
    this._selectedItem = value;
    if (!this.menu.instance) {
      return;
    }

    this.menu.instance.selectItem(value);
  }

  private _items!: Record <string, unknown>[];
  get items() {
    if (!this._items) {
      this._items = navigation.map((item) => {
        if(item.path && !(/^\//.test(item.path))){
          item.path = `/${item.path}`;
        }
         return { ...item, expanded: !this._compactMode }
        });
    }

    return this._items;
  }

  private _compactMode = false;
  @Input()
  get compactMode() {
    return this._compactMode;
  }
  set compactMode(val) {
    this._compactMode = val;

    if (!this.menu.instance) {
      return;
    }

    if (val) {
      this.menu.instance.collapseAll();
    } else {
      this.menu.instance.expandItem(this._selectedItem);
    }
  }

  constructor(private elementRef: ElementRef) {
    this.modulesNavigation.getNavigation().subscribe((menu:any) => {
      if(!menu) return;
      this._items = menu.map((m:any) => {
        let item :any = m;
        if(Array.isArray(m)) item = m[0];
        if(item.path && !(/^\//.test(item.path))){
          item.path = `/${item.path}`;
        }
        this._setItemVisibility(item);
        return { ...item, expanded:false }
      })
    })
    this.getNavItems()
  }

  onItemClick(event: ItemClickEvent) {
    this.selectedItemChanged.emit(event);
  }

 async getNavItems() {
    await this.modulesNavigation.getModuleNavigation()
  }

  _setItemVisibility(item:any) {
    item.visible = true; // TODO: GEt roles from authentication service
    if(item.items && item.items.length > 0){
      item.items.forEach((el:any) => {
        this._setItemVisibility(el);
      });
    }
  }

  ngAfterViewInit() {
    events.on(this.elementRef.nativeElement, 'dxclick', (e: Event) => {
      this.openMenu.next(e);
    });
  }

  ngOnDestroy() {
    events.off(this.elementRef.nativeElement, 'dxclick');
  }
}

@NgModule({
  imports: [ DxTreeViewModule ],
  declarations: [ SideNavigationMenuComponent ],
  exports: [ SideNavigationMenuComponent ]
})
export class SideNavigationMenuModule { }
