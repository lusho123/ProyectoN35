/**
 * Interface para los catalogo, tiene los atributos completos de un catalogo.
 */
export interface Catalogo {
    id: number;
    descripcion: string;
    fechaAlta: Date;
    fechaModificacion: Date;
    idUsuarioAlta: number;
    idUsuarioModificacion: number;
    idCatEstatus: number;
}