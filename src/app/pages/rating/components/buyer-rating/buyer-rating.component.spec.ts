import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerRatingComponent } from './buyer-rating.component';

describe('BuyerRatingComponent', () => {
  let component: BuyerRatingComponent;
  let fixture: ComponentFixture<BuyerRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyerRatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
