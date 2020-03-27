import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import Swal from 'sweetalert2';
import { ComponentesService } from 'src/app/services/componentes.service';

@Component({
  selector: 'app-form-seccion',
  templateUrl: './form-seccion.component.html',
  styleUrls: ['./form-seccion.component.css']
})
export class FormSeccionComponent implements OnInit {

  public formulario: FormGroup; // Formulario
  private idUsuario: number;    // Identificador de usuario(Actualmente Constante)
  private url: string;          // End Point para crear

  constructor(private apiService: ApiService, private componenteService: ComponentesService) { 
    this.idUsuario = 1;
    this.formulario = this.crearFormulario();
    this.url = 'http://localhost:4000/api/postSeccion';
  }

  ngOnInit() {  }

  /**
   * Crea un nuevo Catalogo y avisa al componente tabla que agrego un nuevo elemento.
   */
  crearCatalogo(): void  {
    // Pregunto si esta seguro de crear un nuevo catalogo.
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
      // Si la respuesta es afirmativa y el formulario es valido entonces crea el Catalogo
      if (this.formulario.valid && result.value) {
        const descripcion = this.formulario.value.descripcion;
        this.apiService.postCatalogo(this.url, descripcion, this.idUsuario).subscribe(
          // Si todo es correcto envio el mensaje, actualizo la tabla, limpio el formulario e informo al componte 
          // que si cree el catalogo y le mando el catalogo.
          res => {
            if (res) {
              // this.actualizar(true);
              Swal.fire('Correcto', 'Se ha creado el Catálogo', 'success');
              this.limpiarFormulario();
              // informo al componente
              this.componenteService.agregarCatalogo(res);
            }
          },
          // Informo al usuario que existe un error.
          error => {
            Swal.fire('Error', 'No se agregó el Catálogo', 'error');
          }
        );
      } else {
        // inform que exite en un error al crear un catalogo.
        Swal.fire('Error', 'Descripción no valida', 'error');
      }
    });
  }

  /**
   * Crea el formulario.
   */
  crearFormulario(): FormGroup {
    return new FormGroup({
      descripcion: new FormControl('', [
        Validators.required, 
        Validators.minLength(5),
        Validators.maxLength(100)
        // Validators.pattern('[a-zA-Z0-9-_]{1,10}')
      ])
    });
  }

  /**
   * Limipia los datos del formulario.
   */
  limpiarFormulario() {
    this.formulario.reset();
  }
}
