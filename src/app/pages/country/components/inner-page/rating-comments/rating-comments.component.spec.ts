import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingCommentsComponent } from './rating-comments.component';

describe('RatingCommentsComponent', () => {
  let component: RatingCommentsComponent;
  let fixture: ComponentFixture<RatingCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatingCommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
