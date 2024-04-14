import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NovaTarefaComponent } from './nova-tarefa/nova-tarefa.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TarefaComponent } from './tarefa/tarefa.component';

@NgModule({
  declarations: [AppComponent, NovaTarefaComponent,TarefaComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,FormsModule, HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
