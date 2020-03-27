import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SeccionComponent } from './seccion/seccion.component';


const routes: Routes = [
  // { path: 'catalogos', component: CatalogosComponent },
  { path: 'catalogos/seccion', component: SeccionComponent},
  // { path: 'catalogos/area', component: CatalogoAreaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
