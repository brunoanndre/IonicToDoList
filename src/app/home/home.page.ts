import { Component, OnInit, ViewChild } from '@angular/core';
import { IonItemSliding, IonRouterOutlet, ModalController } from '@ionic/angular';
import { NovaTarefaComponent } from '../nova-tarefa/nova-tarefa.component';
import { APIService } from '../services/api.service';
import { TarefaComponent } from '../tarefa/tarefa.component';




@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  public tarefas!: any[];
  public tarefasFiltradas!:any[];
  descricao!: string;
  filtro:string = 'todas';
  filtroPesquisa!: string;
  ordenacao!: string;

  @ViewChild('sliding')
  public sliding!:IonItemSliding;



  constructor(
    private ModalController:ModalController,
    private routerOutlet: IonRouterOutlet,
    private apiService: APIService
  ) {}

   async ngOnInit(){
    this.tarefas = await this.apiService.listar();
    this.tarefasFiltradas = this.tarefas;
  }

  public async adicionarTarefa(){
    const modal = await this.ModalController.create({
      component: NovaTarefaComponent,
      presentingElement: this.routerOutlet.nativeEl
    })
    modal.present();
    const{data, role } =  await modal.onWillDismiss();
    
    if(role == 'confirm'){
      let today = new Date()
      let novaTarefa = 
      {
        criadaEm: new Date().getTime(),
        descricao: data.descricao,
        favorita: false,
        concluida: false,
        prioridade: data.prioridade,
        data: data.data
      }
      this.tarefas.push(await this.apiService.inserir(novaTarefa));
      this.aplicarFiltro();
      this.aplicarBusca();
    }
  }

  public async removerTarefa(indice:number){
    this.apiService.excluir(this.tarefasFiltradas[indice].id);
    this.tarefas.splice(this.tarefas.findIndex(tarefa => tarefa.id == this.tarefasFiltradas[indice].id),1);
    this.aplicarFiltro();
    this.sliding.closeOpened();
  }

  public favoritar(indice:number){
    this.tarefasFiltradas[indice].favorita = !this.tarefasFiltradas[indice].favorita;
    this.apiService.atualizar(this.tarefasFiltradas[indice].id,this.tarefasFiltradas[indice]);
    this.aplicarFiltro();
    this.aplicarBusca();
    this.sliding.closeOpened();
  }

  public concluirTarefa(indice:number){
    this.tarefasFiltradas[indice].concluida =  !this.tarefasFiltradas[indice].concluida
    this.apiService.atualizar(this.tarefasFiltradas[indice].id,this.tarefasFiltradas[indice]);
    this.aplicarFiltro();
    this.aplicarBusca();
    this.sliding.closeOpened();
  }

  public filtrarTarefas(event: CustomEvent){
    this.filtro = event.detail.value;
    this.aplicarFiltro();
    this.aplicarBusca();
    this.aplicarOrdenacao();
  }

  public aplicarFiltro(){
    if(this.filtro == 'favoritas'){
      this.tarefasFiltradas =  this.tarefas.filter(tarefa => tarefa.favorita)
    }
    if(this.filtro == 'concluidas'){
     this.tarefasFiltradas =  this.tarefas.filter(tarefa => tarefa.concluida)
    }
    if(this.filtro == 'todas'){
      this.tarefasFiltradas = this.tarefas;
    }
    
  }

  public buscarTarefas(event :CustomEvent){
    this.filtroPesquisa = event.detail.value;
    this.aplicarBusca();
    }

  public aplicarBusca(){
    if(this.filtroPesquisa >''){
      this.tarefasFiltradas = this.tarefasFiltradas.filter(t => t.descricao.toLowerCase().includes(this.filtroPesquisa.toLowerCase()) )
    }else{
      this.aplicarFiltro()
    }
  }

  public ordenarTarefas(event: CustomEvent){
    this.ordenacao = event.detail.value;
    this.aplicarOrdenacao();
  }

  public aplicarOrdenacao(){
    this.tarefasFiltradas = this.tarefasFiltradas.sort((a,b) => 
    {
      switch(this.ordenacao){
        case "Data":
          if(a.data < b.data){
            return -1;
          }
          if(a.data > b.data){
            return 1;
          }
          return 0;
        case "Prioridade":
          return b.prioridade - a.prioridade;
        default:
          if(a.descricao.toLowerCase() < b.descricao.toLowerCase()){
            return -1;
          }
          if(a.descricao.toLowerCase() > b.descricao.toLowerCase()){
            return 1;
          }
          return 0;
      }
    }
    );
  }
  public async visualizarTarefa(tarefa: Object){
    const modal = await this.ModalController.create({
      component: TarefaComponent,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: {
        tarefa: tarefa
      }
    })
    modal.present();
    
  }
}
