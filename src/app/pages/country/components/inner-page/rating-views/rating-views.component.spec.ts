import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingViewsComponent } from './rating-views.component';

describe('RatingViewsComponent', () => {
  let component: RatingViewsComponent;
  let fixture: ComponentFixture<RatingViewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatingViewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
