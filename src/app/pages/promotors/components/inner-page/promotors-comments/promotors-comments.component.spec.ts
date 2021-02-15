import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotorsCommentsComponent } from './promotors-comments.component';

describe('PromotorsCommentsComponent', () => {
  let component: PromotorsCommentsComponent;
  let fixture: ComponentFixture<PromotorsCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromotorsCommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotorsCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
