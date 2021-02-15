import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportedSellerComponent } from './reported-seller.component';

describe('ReportedSellerComponent', () => {
  let component: ReportedSellerComponent;
  let fixture: ComponentFixture<ReportedSellerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportedSellerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportedSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
