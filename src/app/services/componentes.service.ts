import { Injectable } from '@angular/core';
import { Catalogo } from '../interfaces/Catalogo';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComponentesService {


  // Observables

  private catalogo = new Subject<Catalogo>();
  enviarCatalogo = this.catalogo.asObservable();

  private editar = new Subject<boolean>();
  enviarEditar = this.editar.asObservable();


  constructor() { }

  // Metodos para los observables

  /**
   * Modifica el catalogo del servicio, este cambia cuando es agregado un catalogo o es modificado.
   * @param catalogo variable de tipo Catalogo
   */
  agregarCatalogo(catalogo: Catalogo) {
    this.catalogo.next(catalogo);
  }

  /**
   * Determina si el model de editar se despliega o no.
   * @param opcion Variable booleana 
   */
  abrirEditar(opcion: boolean) {
    this.editar.next(opcion);
  }
}
