import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class APIService {
  private url: string = "https://66189d169a41b1b3dfbd7f8d.mockapi.io/api/v1/";
  constructor(
    private httpClient: HttpClient
  ) { }

  async listar(){
    return await lastValueFrom(this.httpClient.get(this.url+'tarefa')) as any[];
  }

  async inserir(tarefa:Object){
    return await lastValueFrom(this.httpClient.post(this.url+'tarefa',tarefa));
  }

  async excluir(id:number){
    return await lastValueFrom(this.httpClient.delete(this.url+'tarefa/'+id));
  }

  async atualizar(id:number, tarefa :Object){
    return await lastValueFrom(this.httpClient.put(this.url+'tarefa/'+id,tarefa));
  }
}
