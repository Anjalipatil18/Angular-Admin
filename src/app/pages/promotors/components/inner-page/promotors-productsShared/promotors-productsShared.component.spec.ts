import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotorsProductsSharedComponent } from './promotors-productsShared.component';

describe('UsersFollowComponent', () => {
  let component: PromotorsProductsSharedComponent;
  let fixture: ComponentFixture<PromotorsProductsSharedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromotorsProductsSharedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotorsProductsSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
