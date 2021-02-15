import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorsLikesComponent } from './colors-likes.component';

describe('ColorsLikesComponent', () => {
  let component: ColorsLikesComponent;
  let fixture: ComponentFixture<ColorsLikesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorsLikesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorsLikesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
