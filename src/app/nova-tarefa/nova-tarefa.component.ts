import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-nova-tarefa',
  templateUrl: './nova-tarefa.component.html',
  styleUrls: ['./nova-tarefa.component.scss'],
})
export class NovaTarefaComponent  implements OnInit {

  public descricao!: string;
  public dataTarefa!: Date;
  public prioridade!: string;
  

  constructor(
    private ModalController:ModalController
  ) { }

  ngOnInit() {}

  public cancelar(){
    this.ModalController.dismiss(null,'cancel')
  }

  public confirmar(){
    let novaTarefa = 
    {
      descricao: this.descricao,
      prioridade: this.prioridade,
      data: this.dataTarefa
    };
    this.ModalController.dismiss(novaTarefa,'confirm')
  }
}
