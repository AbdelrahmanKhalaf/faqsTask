import { IaddNewFaq } from './../models/addNewFqa.interfac';
import { IaddNewCAtegory } from './../models/addNewCategory.interface';
import { IupdateCategory } from './../models/updateCategory.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IupdateFaq } from '../models/updateFaq.interface';

@Injectable({
  providedIn: 'root'
})
export class FqasService {
  constructor(private http: HttpClient) { }
  //start data shear btween more a componant
  private CategorySource = new BehaviorSubject<any>('')
  currentCategory: any = this.CategorySource.asObservable()
  changeCatgeory(data: any) {
    this.CategorySource.next(data)
  }
  private DataSource = new BehaviorSubject<any>('')
  currentDate: any = this.DataSource.asObservable()
  changeDataEditFaq(data: any) {
    this.DataSource.next(data)
  }
  private DataCategSource = new BehaviorSubject<any>('')
  currentDateCate: any = this.DataCategSource.asObservable()
  changeDataEditCate(data: any) {
    this.DataCategSource.next(data)
  }
  private DataMoveSource = new BehaviorSubject<any>('')
  currentDataMove: any = this.DataMoveSource.asObservable()
  changeDataMove(data: any) {
    this.DataMoveSource.next(data)
  }
  //end data shear btween more a componant
  //Start Catgories
  //GET all categories
  getAllCategory() {
    return this.http.get('https:/mocawebsitebackend.techno-politan.xyz/api/v1/Categories?WithFaqs=true&WithNonCategorizedFaqs=true')
  }
  //POST add a new category
  addNewCategory(data: IaddNewCAtegory) {
    return this.http.post('https:/mocawebsitebackend.techno-politan.xyz/api/v1/Categories ', data)
  }
  //PUT update the category selected by id 
  updateCAtegory(id: String, data: IupdateCategory) {
    return this.http.put(`https:/mocawebsitebackend.techno-politan.xyz/api/v1/Categories/${id}`, data)
  }
  //DELETE delete the category selected by id 
  deleteCategory(id: String) {
    return this.http.delete(`https:/mocawebsitebackend.techno-politan.xyz/api/v1/Categories/${id}?DeleteRelatedFaqs=true`)
  }
  //End Catgories

  //GET every category’s FAQs
  getAllFqas() {
    return this.http.get('https:/mocawebsitebackend.techno-politan.xyz/api/v1/Categories?WithFaqs=true&WithNonCategorizedFaqs=true')
  }
  //POST add a new faq with categoryID
  addnewFaqs(data: IaddNewFaq, id: string) {
    return this.http.post(`https:/mocawebsitebackend.techno-politan.xyz/api/v1/Faqs/Category/${id}`, data)
  }
  //PUT update the faq selected by id 
  updateFaq(data: IupdateFaq, id: String) {
    return this.http.put(`https://mocawebsitebackend.techno-politan.xyz/api/v1/Faqs/${id}`, data)
  }
  //DELETE delete the faq selected by id 
  deleteFaq(id: String) {
    return this.http.delete(`https:/mocawebsitebackend.techno-politan.xyz/api/v1/Faqs/${id}`)
  }
}
