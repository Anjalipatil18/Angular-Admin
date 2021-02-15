import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotorsUserdetailsComponent } from './promotors-userdetails.component';

describe('PromotorsUserdetailsComponent', () => {
  let component: PromotorsUserdetailsComponent;
  let fixture: ComponentFixture<PromotorsUserdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromotorsUserdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotorsUserdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
