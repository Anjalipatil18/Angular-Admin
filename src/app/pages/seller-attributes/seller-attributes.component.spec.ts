import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerAttributesComponent } from './seller-attributes.component';

describe('SellerAttributesComponent', () => {
  let component: SellerAttributesComponent;
  let fixture: ComponentFixture<SellerAttributesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerAttributesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
