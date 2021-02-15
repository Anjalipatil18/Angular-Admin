import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotorsLikesComponent } from './promotors-likes.component';

describe('PromotorsLikesComponent', () => {
  let component: PromotorsLikesComponent;
  let fixture: ComponentFixture<PromotorsLikesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromotorsLikesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotorsLikesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
