import { BehaviorSubject } from 'rxjs';
import * as modules from './modules';

export const navigation = [
  {
    text: 'Home',
    path: '/home',
    icon: 'home'
  },
  {
    text: 'Setari',
    icon:'fa fa-cogs',
    items: [
      {
        text: 'Categorii',
        path: '/profile'
      },
      {
        text: 'General',
        path: '/tasks'
      }
    ]
  }
];

export class Navigation {
  nav:BehaviorSubject<any> = new BehaviorSubject<any>(null)
  constructor() {}
  async getModuleNavigation() {
    let menus:any[] = [{
        text:   'Home',
        path:   '/home',
        icon:   'home',
        visible: true
    }];
    for(const moduleName in modules as any) {
      let module:any = modules;
      let m = module[moduleName];
      if(m.prototype.getMenu) {
        let menu;
        menu = await m.prototype.getMenu();
        menus.push(menu);
      }
    }
    menus.sort((a,b) => (a.index > b.index) ? 1 : ((b.index > a.index)? -1 : 0))
    this.nav.next(menus);
  }

  getNavigation() {
    return this.nav.asObservable();
  }
}
