import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubSubTypeComponent } from './sub-sub-type.component';

describe('SubSubTypeComponent', () => {
  let component: SubSubTypeComponent;
  let fixture: ComponentFixture<SubSubTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubSubTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubSubTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
