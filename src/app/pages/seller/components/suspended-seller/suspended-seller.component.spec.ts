import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspendedSellerComponent } from './suspended-seller.component';

describe('SuspendedSellerComponent', () => {
  let component: SuspendedSellerComponent;
  let fixture: ComponentFixture<SuspendedSellerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuspendedSellerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuspendedSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
