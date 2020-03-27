import { Component, OnInit, Input } from '@angular/core';
import { Catalogo } from '../../interfaces/Catalogo';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import Swal from 'sweetalert2';
import { ComponentesService } from '../../services/componentes.service';

@Component({
  selector: 'app-editar-seccion',
  templateUrl: './editar-seccion.component.html',
  styleUrls: ['./editar-seccion.component.css']
})
export class EditarSeccionComponent implements OnInit {
  
  /**
   * Siempre esto estuchando si hay un Catalogo seleccionado, si lo hay lo obtengo y construllo sus Url
   */
  @Input()
  set ide(ide: number) {
    if (ide) {
      this.idUsuario = 1;  // Usuario constante
      this.urlCatalogo = 'http://localhost:4000/api/getSeccion/' + ide;
      this.urlModificar = 'http://localhost:4000/api/putSeccion/' + ide;
      this.obtenerCatalogo();
    }
  }

  public catalogo: Catalogo;      // Catalogo a modificar.
  private urlCatalogo: string;    // End Point para obtener el catalogo.
  private urlModificar: string;   // End Point para modificar.
  public  formulario: FormGroup;  // Formulario para modificar
  private idUsuario: number;      // Id de Usuario que modifica (Actualmente constante).
  public editar: boolean;         // Determina si el modal

  constructor(private apiService: ApiService, private componenteService: ComponentesService) {
    this.formulario = this.crearFormulario();
    this.editar = false;
  }

  ngOnInit() {
    this.idUsuario = 1;
    this.componenteService.enviarEditar.subscribe(
      res => this.editar = res
    )
  }


  /**
   * Obtengo el catalogo a editar.
   */
  obtenerCatalogo() {
    this.apiService.getCatalogo(this.urlCatalogo).subscribe(
      res => {
        this.catalogo = res;
        console.log(res);
        this.formulario.setValue({
          descripcion: this.catalogo.descripcion
        });
        this.editar = true;
      },
      error => {
        console.log('Error al Obtener Catalogo');
      }
    );
  }

  /**
   * Realiza la modificación del catalogo.
   */
  modificarCatalogo() {
    // Pregunta si quiere realizar la modifación
    Swal.fire({
      title: 'Estas seguro que deseas editar catalogo?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, editar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      // Si el formulario es correcto y si quiere modificar
      if (this.formulario.valid && result.value) {
        // Realiza los cambios
          this.catalogo.descripcion = this.formulario.value.descripcion;
          this.catalogo.idUsuarioModificacion = this.idUsuario;
          this.apiService.putCatalogo(this.urlModificar, this.catalogo).subscribe(
            // Si la modificación es correcta informa a usuario y al componente tabla
            res => {
              Swal.fire('Correcto', 'Se ha modificado el Catálogo', 'success');
              // Informo al componente tabla 
              this.componenteService.agregarCatalogo(null);
              // Cierra el modal
              this.componenteService.abrirEditar(false);
              // this.cat.emit(true);
            },
            // Si existe un error informo al usuario
            error => {
              Swal.fire('Error', 'No se ha modificado el Catálogo', 'error');
              this.componenteService.abrirEditar(false);
            }
          );
      } else {
        // this.limpiarFormulario();
      }
    });
  }

  /**
   * Crea el formulario
   */
  crearFormulario() {
    return new FormGroup({
      descripcion: new FormControl('', [
        Validators.required, 
        Validators.minLength(5),
        Validators.maxLength(30),
        // Validators.pattern('[a-zA-Z0-9-_]{1,10}')
      ])
    });
  }

  /**
   * Limpia Formulario
   */
  limpiarFormulario() {
    this.formulario.reset();
  }

  /**
   * Da formato a la fecha a partir de una fecha
   * @param fecha Variable tipo Date.
   */
  getFecha(fecha: Date) {
    let fec: string;
    if (fecha) {
      const f = new Date(fecha);
      fec = (f.getDate() < 10 ? '0' + f.getDate() : f.getDate()) + '/'
            + ((f.getMonth() + 1)  < 10 ? '0' + (f.getMonth() + 1) : f.getMonth() + 1 ) + '/'
            + f.getFullYear();
    } else {
      fec = ' - ';
    }
    return fec;
  }

  /**
   * Da formato a la hora a partir de una fecha
   * @param fecha Variable tipo Date.
   */
  getHora(fecha: Date) {
    let fec: string;
    if (fecha) {
      const f = new Date(fecha);
      fec = (f.getHours()) + ':'
            + (f.getMinutes()) + ':'
            + f.getSeconds();
    } else {
      fec = ' - ';
    }
    return fec;
  }

  /**
   * Cierra el modal.
   */
  cerrar(): void{
    this.componenteService.abrirEditar(false);
  }

}
