import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFqasComponent } from './add-fqas.component';

describe('AddFqasComponent', () => {
  let component: AddFqasComponent;
  let fixture: ComponentFixture<AddFqasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFqasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFqasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
