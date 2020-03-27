import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {NgxPaginationModule} from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SeccionComponent } from './seccion/seccion.component';
import { FormSeccionComponent } from './seccion/form-seccion/form-seccion.component';
import { FiltrarSeccionComponent } from './seccion/filtrar-seccion/filtrar-seccion.component';
import { TablaSeccionComponent } from './seccion/tabla-seccion/tabla-seccion.component';
import { EditarSeccionComponent } from './seccion/editar-seccion/editar-seccion.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { ComponentesService } from './services/componentes.service';

@NgModule({
  declarations: [
    AppComponent,
    SeccionComponent,
    FormSeccionComponent,
    FiltrarSeccionComponent,
    TablaSeccionComponent,
    EditarSeccionComponent,
    MenuComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [
    ComponentesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
