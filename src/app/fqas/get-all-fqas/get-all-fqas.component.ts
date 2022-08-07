import { HiddenAndVisbileService } from './../../shard/helpers/hidden-and-visbile.service';
import { IupdateCategory } from './../../shard/models/updateCategory.interface';
import { FqasService } from './../../shard/services/fqas.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-get-all-fqas',
  templateUrl: './get-all-fqas.component.html',
  styleUrls: ['./get-all-fqas.component.css']
})
export class GetAllFqasComponent implements OnInit {

  constructor(private fqasService: FqasService, private hiddenAndVisible: HiddenAndVisbileService) { }
  public newDataCategory: any;
  public newDataFaq: any;
  public newDataEditFaq: any;
  public fqas: any = [];
  public errorMessage: any
  public messageSuc: any;
  //start Categories
  // to move any element found in array categories (Drag && Drop)
  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.fqas, event.previousIndex, event.currentIndex);
  }
  //for collapse the category 
  select(index: any, indexIconOne: any, indexIconTwo: any) {
    this.hiddenAndVisible.HiddenAndVisible({ index, indexIconOne, indexIconTwo, display: 'block' })
  }
  //receive a new category form the chaild 
  receiveDataCategory($event: any) {
    this.newDataCategory = $event
    this.fqas.push(this.newDataCategory)
  }
  //send data to edit category component to show in inputs in the form and get id 
  openAndSendToCateg(data: any) {
    this.fqasService.changeDataEditCate(data)
  }
  // delete category
  deleteCategory(id: String, i: number) {
    const value = confirm('Are you sure to delete the category ?')
    this.fqasService.deleteCategory(id).subscribe((res: any) => {
      this.errorMessage = ""
      if (value) {
        if (i > -1) {
          this.fqas.splice(i, 1)

        }
      }
      this.fqasService.changeCatgeory({ index: i })
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
  //end Categories
  //Start FAQs
  //receive a new faq form the chaild 
  receiveDataFaq($event: any) {
    this.newDataFaq = $event
    this.fqas.forEach((element: any) => {
      //to failter the array must add in ==>> O(n)
      if (element.id == this.newDataFaq.categoryId) {
        //to push a new faq to faqs       
        element.faqs.push(this.newDataFaq)
      }
    });
  }
  // to move any element found in array faqs of categories (Drag && Drop)
  drop2(event: CdkDragDrop<string[]>, index: any) {
    moveItemInArray(this.fqas[index].faqs, event.previousIndex, event.currentIndex);
  }
  //send data to edit faq component to show in inputs in the form and get id 
  openAndSend(data: any, categoryId: any) {

    data.categoryId = categoryId
    this.fqasService.changeDataEditFaq(data)
    //to recive date cahnged to take action abou it
    // this.fqasService.currentDate.subscribe((recevie: any) => {
    //   // in here if the categoryId cahnged i need to user see that is happend for this i replace places for faqs uses splice , push and forEach
    //   if (recevie.changed && categoryId !== recevie.categoryId) {
    //     console.log('iam here');

    //     this.fqas[indexOne].faqs.splice(indexTwo, 1)
    //     var index = this.fqas.findIndex(function (person: any) {
    //       return person.id == recevie.categoryId
    //     });
    //     this.fqas[index].faqs.push(recevie)
    //     // console.log(recevie);
    //     // this.fqas.forEach((element: any) => {
    //     //   if (element.id == recevie.categoryId && categoryId != recevie.categoryId) {
    //     //     element.faqs.push(recevie)
    //     //     recevie = ''
    //     //     recevie.changed = Boolean(false)
    //     //     this.fqasService.changeDataMove(recevie)
    //     //   }
    //     // });
    //   }


    // in here the solution for i want to is not perfct becuse with every click the code will run and will do things i do not want happend 

    // })

  }
  recevieDataEdit(e: any) {
    // to receive data from the chaild component as edit-faq to save cahnged in the pernt component as get all fqas
    if (e) {
      let indexCategoryOld = this.fqas.findIndex(function (person: any) {
        return person.id == e.oldCategoryId
      });
      let indexCategoryNew = this.fqas.findIndex(function (person: any) {
        return person.id == e.categoryId
      });
      let indexFaq = this.fqas[indexCategoryOld].faqs.findIndex(function (person: any) {
        return person.id == e.oldId
      });
      this.fqas[indexCategoryOld].faqs.splice(indexFaq, 1)
      this.fqas[indexCategoryNew].faqs.push(e)
    }

  }
  //DELETE FAQ
  deleteFaq(id: String, i1: number, i2: number) {
    const value = confirm('Are you sure to delete the FAQ ?')
    this.fqasService.deleteFaq(id).subscribe((res: any) => {
      this.errorMessage = ""
      if (value) {
        if (i2 > -1) {
          this.fqas[i1].faqs.splice(i2, 1)
        }
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
  //end FAQs
  ngOnInit(): void {
    // to get All categories With FQAs
    this.fqasService.getAllFqas().subscribe((res: any) => {
      if (res.statusCode === 200) {
        this.fqas = res.data.categories

      }
    })

  }

}

