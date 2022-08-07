import { IupdateFaq } from './../../shard/models/updateFaq.interface';
import { FqasService } from 'src/app/shard/services/fqas.service';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-faq',
  templateUrl: './edit-faq.component.html',
  styleUrls: ['./edit-faq.component.css']
})
export class EditFaqComponent implements OnInit {
  @Output() messageEvent = new EventEmitter()

  message: any
  public categories: any
  public errorMessage: any;
  public data: any
  constructor(private faq: FqasService) { }


  ngOnInit(): void {
    //listen to any faq the user selected

    this.faq.currentDate.subscribe((receive: any) => {
      if (receive) {
        this.data = receive
      }
    })
    //get all Of catgory
    this.faq.getAllCategory().subscribe((res: any) => {
      this.categories = res.data.categories
    })
    //listen to any category added for faq dropdown to be a async
    this.faq.currentCategory.subscribe((rec: any) => {
      if (rec.id) {
        rec.faqs = []
        this.categories.push(rec)
      }
      if (rec.index) {
        this.categories.splice(rec.index, 1)
      }
    })

  }

  form = new FormGroup({
    question: new FormControl('', Validators.required),
    answer: new FormControl('', Validators.required),
    categoryId: new FormControl('', Validators.required)

  })
  get question(): any {
    return this.form.get('question')
  }
  get answer(): any {
    return this.form.get('answer')
  }
  get categoryId(): any {
    return this.form.get('categoryId')
  }
  updateFaq(id: any) {
    let data: IupdateFaq = {
      question: this.question?.value,
      answer: this.answer?.value,
      categoryId: this.categoryId.value
    }
    this.faq.updateFaq(data, this.data.id).subscribe((res: any) => {
      if (res.statusCode) {
        //if user change id category 
        if (this.data.categoryId != this.categoryId.value) {
          //add to data will send the (old catgory id && old id faq)to fillter categories and remove the faq from it in perent component 
          res.data.oldCategoryId = this.data.categoryId
          //the old id for faq
          res.data.oldId = this.data.id
          this.messageEvent.emit(res.data)
        }
        //to send a new faq to perent component as (get-all-fqas component) for show to user to see what is happend
        // if (this.data.categoryId)
        //   this.faq.changeDataEditFaq(res.data)
        this.message = res.message
        this.errorMessage = ''
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
        this.errorMessage = err.error.message;
      }

    }
    )
  }
}
