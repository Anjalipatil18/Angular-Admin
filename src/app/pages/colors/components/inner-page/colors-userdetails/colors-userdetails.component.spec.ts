import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorsUserdetailsComponent } from './colors-userdetails.component';

describe('ColorsUserdetailsComponent', () => {
  let component: ColorsUserdetailsComponent;
  let fixture: ComponentFixture<ColorsUserdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorsUserdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorsUserdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
