import { AddCategoryComponent } from './categories/add-category/add-category.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FqaRoutingModule } from './fqa-routing.module';
import { GetAllFqasComponent } from './get-all-fqas/get-all-fqas.component';
import { AddFqasComponent } from './add-fqas/add-fqas.component';
import { MatSliderModule } from '@angular/material/slider';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { EditFaqComponent } from './edit-faq/edit-faq.component';
import { EditCategoryComponent } from './categories/edit-category/edit-category.component';

@NgModule({
  declarations: [
    AddCategoryComponent,
    GetAllFqasComponent,
    AddFqasComponent,
    EditFaqComponent,
    EditCategoryComponent,
  ],
  imports: [
    CommonModule,
    FqaRoutingModule,
    MatSliderModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule.forRoot({
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
          ['blockquote', 'code-block'],

          [{ 'header': 1 }, { 'header': 2 }],               // custom button values
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
          [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
          [{ 'direction': 'rtl' }],                         // text direction

          [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

          [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
          [{ 'font': [] }],
          [{ 'align': [] }],

          ['clean'],                                         // remove formatting button

          ['link', 'image', 'video']                         // link and image, video
        ]
      }
    })

  ]
})
export class FqaModule { }
