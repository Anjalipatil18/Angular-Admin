import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSubTypeComponent } from './update-sub-type.component';

describe('UpdateSubTypeComponent', () => {
  let component: UpdateSubTypeComponent;
  let fixture: ComponentFixture<UpdateSubTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateSubTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSubTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
