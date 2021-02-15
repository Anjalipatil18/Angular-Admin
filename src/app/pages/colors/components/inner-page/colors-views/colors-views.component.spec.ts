import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorsViewsComponent } from './colors-views.component';

describe('ColorsViewsComponent', () => {
  let component: ColorsViewsComponent;
  let fixture: ComponentFixture<ColorsViewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorsViewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorsViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
