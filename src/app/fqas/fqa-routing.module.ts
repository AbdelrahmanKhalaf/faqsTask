import { GetAllFqasComponent } from './get-all-fqas/get-all-fqas.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:"" , component:GetAllFqasComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FqaRoutingModule { }
