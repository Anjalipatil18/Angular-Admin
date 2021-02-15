import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerEditViewComponent } from './seller-editView.component';

describe('SellerEditViewComponent', () => {
  let component: SellerEditViewComponent;
  let fixture: ComponentFixture<SellerEditViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SellerEditViewComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerEditViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
