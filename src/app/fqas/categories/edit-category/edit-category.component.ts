import { FqasService } from 'src/app/shard/services/fqas.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IupdateCategory } from 'src/app/shard/models/updateCategory.interface';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  public message: any;
  public errorMessage: any;
  public data: any
  constructor(private fqasService: FqasService) { }
  ngOnInit(): void {
    this.fqasService.currentDateCate.subscribe((receive: any) => {
      if (receive) {
        this.data = receive
        console.log(receive);
        
      }
    })
  }
  form = new FormGroup({
    name: new FormControl('', Validators.required)
  })
  get name(): any {
    return this.form.get('name')
  }
  saveUpdateCategory() {
    let data: IupdateCategory = {
      name: this.name?.value
    }
    this.fqasService.updateCAtegory(this.data.id, data).subscribe((res: any) => {
      if (res.statusCode === 200) {
        this.message = res.message
        this.errorMessage = ""
      }
    }, (err: any) => {
      if (err.status === 502) {
        this.errorMessage = err.error.message;
      }
      if (err.status === 501) {
        this.errorMessage = err.error.message;
      }
      if (err.status === 500) {
        this.errorMessage = err.error.message;
      }
      if (err.status === 400) {
        this.errorMessage = err.error.message;
      }
      if (err.status === 404) {
        this.errorMessage = err.error.message;
      }
      if (err.status === 401) {
        this.errorMessage = err.error.error.message;
      }
    })
  }
}
