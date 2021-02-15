import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqSubcategoryComponent } from './faq-subcategory.component';

describe('FaqSubcategoryComponent', () => {
  let component: FaqSubcategoryComponent;
  let fixture: ComponentFixture<FaqSubcategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaqSubcategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqSubcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
