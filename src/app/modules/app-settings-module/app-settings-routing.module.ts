import { ConfigListaInventarComponent } from './config-lista-inventar/config-lista-inventar.component';
import { AuthGuardService } from './../../shared/services/auth.service';
import { AppSettingsModuleComponent } from './app-settings.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes:Routes = [
  {
    path:'',
    component:AppSettingsModuleComponent,
    data:{
      title:'Configurari',
      icon:'fa fa-cogs',
      allowedRoles:[]
    },
    children:[
      {
        path:'categories-inventar',
        component:ConfigListaInventarComponent,
        canActivate:[AuthGuardService],
        data:{
          title: 'Categorii Inventar',
          allowedRoles:[],
          icon: 'fa fa-list'
        }
      },
      {
        path:'categories-echip',
        component:ConfigListaInventarComponent,
        canActivate:[AuthGuardService],
        data:{
          title: 'Categorii Echipamente',
          allowedRoles:[],
          icon: 'fa fa-list-alt'
        }
      },
      {
        path:'categories-operations',
        component:ConfigListaInventarComponent,
        canActivate:[AuthGuardService],
        data:{
          title: 'Lista Operatii',
          allowedRoles:[],
          icon:'fa fa-th-list'
        }
      },
      {
        path:'categories-locations',
        component:ConfigListaInventarComponent,
        canActivate:[AuthGuardService],
        data:{
          title: 'Lista Locatii',
          allowedRoles:[],
          icon: 'fa fa-list-ol'
        }
      }
    ]
  }
]
export const menu = routes.map((r:any) => {
  return {
    index:2,
    text:r.data?r.data.title:'',
    icon:r.data? r.data.icon: '',
    path:r.path,
    allowedRoles:r.data?r.data.allowedRoles:[],
    items:r.children.map((c:any) => {
      return {
        text:c.data?c.data.title:'',
        icon:c.data? c.data.icon: '',
        path:`configurari/${c.path}`,
        allowedRoles:c.data?c.data.allowedRoles:[]
      }
    })
  }
})

@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class AppSettingsRoutingModule {

}
