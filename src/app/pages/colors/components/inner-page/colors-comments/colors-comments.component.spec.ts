import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorsCommentsComponent } from './colors-comments.component';

describe('ColorsCommentsComponent', () => {
  let component: ColorsCommentsComponent;
  let fixture: ComponentFixture<ColorsCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorsCommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorsCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
