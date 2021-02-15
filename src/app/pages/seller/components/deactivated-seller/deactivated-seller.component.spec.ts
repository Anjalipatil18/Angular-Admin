import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeactivatedSellerComponent } from './deactivated-seller.component';

describe('DeactivatedSellerComponent', () => {
  let component: DeactivatedSellerComponent;
  let fixture: ComponentFixture<DeactivatedSellerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeactivatedSellerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeactivatedSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
