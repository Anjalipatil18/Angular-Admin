import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerLikesComponent } from './seller-likes.component';

describe('SellerLikesComponent', () => {
  let component: SellerLikesComponent;
  let fixture: ComponentFixture<SellerLikesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerLikesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerLikesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
