import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqUpdatecategoryComponent } from './faq-updatecategory.component';

describe('FaqUpdatecategoryComponent', () => {
  let component: FaqUpdatecategoryComponent;
  let fixture: ComponentFixture<FaqUpdatecategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaqUpdatecategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqUpdatecategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
