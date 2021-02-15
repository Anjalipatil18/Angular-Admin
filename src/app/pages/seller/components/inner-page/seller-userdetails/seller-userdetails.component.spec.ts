import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerUserdetailsComponent } from './seller-userdetails.component';

describe('SellerUserdetailsComponent', () => {
  let component: SellerUserdetailsComponent;
  let fixture: ComponentFixture<SellerUserdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerUserdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerUserdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
