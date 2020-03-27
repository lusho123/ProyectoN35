import { Component, OnInit } from '@angular/core';
import { Catalogo } from 'src/app/interfaces/Catalogo';
import { ApiService } from '../../services/api.service';
import Swal from 'sweetalert2';
import { ComponentesService } from 'src/app/services/componentes.service';

@Component({
  selector: 'app-tabla-seccion',
  templateUrl: './tabla-seccion.component.html',
  styleUrls: ['./tabla-seccion.component.css']
})
export class TablaSeccionComponent implements OnInit {

  public catalogo: Catalogo[];       // Arreglo de catalogos
  private urlCatalogos: string;      // End Point para obtener catalogos
  private urlDeleteCatalogo: string; // End Point para eliminar catalogos
  public paginaActual: number;       // Variable para el paginado de la tabla
  private idUsuario;                 // Identificador de usuario (actualmente constante)
  public  ide: number;               // Identificador de catalogo a editar.
  public editar: boolean;            // Bandera para modal editar.


  constructor(private apiService: ApiService,  private componenteService: ComponentesService) {
    this.paginaActual = 1;
    this.urlCatalogos = 'http://localhost:4000/api/getSecciones';
    this.urlDeleteCatalogo = 'http://localhost:4000/api/deleteSeccion';
  }

  ngOnInit() {

    // Obtenemos los catalogos del api rest
    this.apiService.getCatalogos(this.urlCatalogos).subscribe(
      res => this.catalogo = res
    );

    // Suscripcion para actualización de tabla
    this.componenteService.enviarCatalogo.subscribe(
      res => {
        if (res) {
          this.catalogo.push(res);
        } else {
          this.apiService.getCatalogos(this.urlCatalogos).subscribe(
            cat => this.catalogo = cat
          );
        }
      }
    );

    // Suscripción para ver si el modal está activo o no.
    this.componenteService.enviarEditar.subscribe(
      res => this.editar = res
    );
  }

  /**
   * Abre el modal para editar un Catálogo.
   * @param id Identificador del Catálogo a editar
   */
  mostrarEditar(id: number): void {
    this.ide = id ;
    this.componenteService.abrirEditar(true);
    this.editar = true;
  }

  /**
   * Elimina catalogo del arreglo y cambia el estatus en el back.
   * @param id Identificador del Catálogo a editar
   */
  eliminarCatalogo(id: number): void {

    // Pregunta si esta seguro de realizar la acción
    Swal.fire({
      title: 'Estas seguro que deseas eliminar?',
      text: 'No podras recuperarlo',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      // Si esta seguro manda informa al api rest
      if (result.value) {
        this.apiService.deleteCatalogo(`${this.urlDeleteCatalogo}/${id}`).subscribe(
          // Si la respuesta es correcta, elimina el elemento del arreglo y manda aviso.
          res => {
              Swal.fire('El Catalogo ha sido eliminado', '', 'success');
              this.catalogo.forEach( (cat, index, catalogo) => {
                if (cat.id === id) {
                    catalogo.splice(index, 1);
                  }
              });
          },
          // Si la respuesta es erronea informa al usuario que existio un error.
          error => {
            Swal.fire('No se elimino el catalogo', '', 'error');
          }
        );
      }
    });
  }

  /**
   * Da formato a fecha y la regresa en un string.
   * @param fecha Variable de tipo Date
   */
  formatoFecha(fecha: Date): string {
    let fec: string;
    if (fecha) {
      const f = new Date(fecha);
      fec = (f.getDate() < 10 ? '0' + f.getDate() : f.getDate()) + '/'
            + ((f.getMonth() + 1)  < 10 ? '0' + (f.getMonth() + 1) : f.getMonth() + 1 ) + '/'
            + f.getFullYear();
    }
    return fec;
  }

}
