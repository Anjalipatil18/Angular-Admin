import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAttributeGroupComponent } from './update-attribute-group.component';

describe('UpdateAttributeGroupComponent', () => {
  let component: UpdateAttributeGroupComponent;
  let fixture: ComponentFixture<UpdateAttributeGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateAttributeGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAttributeGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
