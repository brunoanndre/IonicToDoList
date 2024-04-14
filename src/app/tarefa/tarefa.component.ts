import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tarefa',
  templateUrl: './tarefa.component.html',
  styleUrls: ['./tarefa.component.scss'],
})
export class TarefaComponent  implements OnInit {
  public tarefa!: any;
  public tarefaInfo: any;
  constructor(
    private modalControler : ModalController,
  ) { }

  async ngOnInit() {
    this.tarefaInfo = 
    {
      id: this.tarefa.id,
      descricao: this.tarefa.descricao,
      prioridade: this.tarefa.prioridade,
      criadaEm: this.tarefa.criadaEm,
      data: this.tarefa.data,
      concluida: this.tarefa.concluida ? "Sim":"Não",
      favorita: this.tarefa.favorita ? "Sim": "Não"
    }
  }

  public fechar(){
    this.modalControler.dismiss(null,'fechar');
  }
}
