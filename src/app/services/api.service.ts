import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Catalogo } from '../interfaces/Catalogo';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  /**
   * Regresa todos los catalogos de la base de datos.
   * @param url URL de End Point.
   */
  getCatalogos(url: string): Observable<Catalogo []> {
    return this.http.get<Catalogo []>(url);
  }

  /**
   * Regresa un catalogo.
   * @param url URL de End Point con identificador.
   */
  getCatalogo(url: string): Observable<Catalogo> {
    return this.http.get<Catalogo>(url);
  }

  /**
   * Regresa un arreglo de Catalogos de a cuerdo a las opciones de busqueda.
   * @param url URL de End Point.
   * @param opciones Objeto con las opciones 
   * @alias { descripcion?: string, fechaAlta?: Date, fechaModificacion?: Date, idEstatusCatalogo: number }
   */
  getCatalogosBusqueda(url: string, opciones: any): Observable<Catalogo []>{
    return this.http.post<Catalogo []>(url, opciones);
  }

  /**
   * Agrega nuevo Catalogo.
   * @param url URL de End Point
   * @param descripcion String con la descripción del catalogo.
   */
  postCatalogo(url: string, descripcion: string, idUsuarioAlta: number) {
    const opciones = { descripcion, idUsuarioAlta };
    return this.http.post<Catalogo>(url, opciones);
  }

  /**
   * Actualiza el Catalogo completamente.
   * @param url URL de End Point.
   * @param catalogo Catalogo ya modificado.
   */
  putCatalogo(url: string, catalogo: Catalogo) {
    return this.http.put<boolean>(url, catalogo);
  }

  /**
   * Actualiza el estatus del catalogo.
   * @param url URL de End Point.
   * @param catalogo Catalogo con el estatus modificado.
   */
  patchCatalogo(url: string, catalogo: Catalogo) {
    return this.http.put<boolean>(url, catalogo);
  }

  /**
   * Elimina un catalogo de la base de datos.
   * @param url URL con el idenificadro del Catalogo a eliminar
   */
  deleteCatalogo(url: string) {
    return this.http.delete(url);
  }
}
