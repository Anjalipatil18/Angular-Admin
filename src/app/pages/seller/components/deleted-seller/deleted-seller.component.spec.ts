import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedSellerComponent } from './deleted-seller.component';

describe('DeletedSellerComponent', () => {
  let component: DeletedSellerComponent;
  let fixture: ComponentFixture<DeletedSellerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletedSellerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletedSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
