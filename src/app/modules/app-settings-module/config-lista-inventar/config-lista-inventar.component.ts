import { Component, OnInit } from '@angular/core';
import { EditingStartEvent } from 'devextreme/ui/tree_list';

@Component({
  selector: 'app-config-lista-inventar',
  templateUrl: './config-lista-inventar.component.html',
  styleUrls: ['./config-lista-inventar.component.scss']
})
export class ConfigListaInventarComponent implements OnInit {

  listaInventar:any[] = []
  editingRow: any = {};

  constructor() { }

  ngOnInit(): void {
  }

  handleEditingStart(e:EditingStartEvent){
    console.log(e.data);

    this.editingRow = e.data;
  }

  validateRange(e:any) {
    console.log(e);
    return Promise.resolve(e.data.marjaMin < e.data.marjaMax)
  }
}
