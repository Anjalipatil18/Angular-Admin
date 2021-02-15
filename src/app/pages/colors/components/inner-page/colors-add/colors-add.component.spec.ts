import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorsAddComponent } from './colors-add.component';

describe('ColorsAddComponent', () => {
  let component: ColorsAddComponent;
  let fixture: ComponentFixture<ColorsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
