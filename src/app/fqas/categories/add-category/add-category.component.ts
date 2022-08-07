import { IaddNewCAtegory } from './../../../shard/models/addNewCategory.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter, } from '@angular/core';
import { FqasService } from 'src/app/shard/services/fqas.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  constructor(private faq: FqasService) { }
  public message: any
  public errorMessage: any;
  //for send data to the pernt 
  @Output() messageEvent = new EventEmitter()

  form = new FormGroup({
    name: new FormControl('', Validators.required)
  })

  get name(): any {
    return this.form.get('name')
  }

  addNewCategory() {
    let data: IaddNewCAtegory = {
      name: this.name?.value
    }
    this.faq.addNewCategory(data).subscribe((res: any) => {
      if (res.statusCode) {
        this.message = res.message
        //to send a new category to perent component as (get-all-fqas component)
        this.messageEvent.emit(res.data)
        this.errorMessage = ''
        //to add a new changes hppend
        this.faq.changeCatgeory(res.data)
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
    }

    )

  }

  ngOnInit(): void {

  }

}
