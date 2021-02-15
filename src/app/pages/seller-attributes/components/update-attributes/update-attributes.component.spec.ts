import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAttributesComponent } from './update-attributes.component';

describe('UpdateAttributesComponent', () => {
  let component: UpdateAttributesComponent;
  let fixture: ComponentFixture<UpdateAttributesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateAttributesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
