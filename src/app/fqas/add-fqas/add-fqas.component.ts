import { IaddNewFaq } from './../../shard/models/addNewFqa.interfac';
import { FqasService } from 'src/app/shard/services/fqas.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';

@Component({
  selector: 'app-add-fqas',
  templateUrl: './add-fqas.component.html',
  styleUrls: ['./add-fqas.component.css']
})
export class AddFqasComponent implements OnInit {
  public categories: any;
  public errorMessage: any;
  public message: any = []

  constructor(private faqs: FqasService) { }

  ngOnInit(): void {
    this.faqs.getAllCategory().subscribe((res: any) => {
      this.categories = res.data.categories

    })
    //listen to any category added for faq dropdown to be a async
    this.faqs.currentCategory.subscribe((rec: any) => {
      if (rec.id) {
        rec.faqs = []
        this.categories.push(rec)
      }
      if (rec.index) {
        this.categories.splice(rec.index, 1)
      }
    }
    );
  }
  //for send data to the pernt as all FAQs
  @Output() messageEvent = new EventEmitter()
  form = new FormGroup({
    question: new FormControl('', Validators.required),
    answer: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required)
  })
  get question(): any {
    return this.form.get('question')
  }
  get answer(): any {
    return this.form.get('answer')
  }
  get category(): any {
    return this.form.get('category')
  }
  addnewQution() {
    let data: IaddNewFaq = {
      question: this.question.value,
      answer: this.answer.value
    }
    this.faqs.addnewFaqs(data, this.category.value).subscribe((res: any) => {
      if (res.statusCode) {
        this.message.push(res.message)
        //to send a new faq to perent component as (get-all-fqas component)
        this.messageEvent.emit(res.data)
        this.errorMessage = ''
      }
    }, (err: any) => {
      this.message.length = 0
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
    })
  }


}
