import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerViewsComponent } from './seller-views.component';

describe('SellerViewsComponent', () => {
  let component: SellerViewsComponent;
  let fixture: ComponentFixture<SellerViewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerViewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
