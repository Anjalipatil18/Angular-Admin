import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingUserdetailsComponent } from './rating-userdetails.component';

describe('RatingUserdetailsComponent', () => {
  let component: RatingUserdetailsComponent;
  let fixture: ComponentFixture<RatingUserdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatingUserdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingUserdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
