import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerCommentsComponent } from './seller-comments.component';

describe('SellerCommentsComponent', () => {
  let component: SellerCommentsComponent;
  let fixture: ComponentFixture<SellerCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerCommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
