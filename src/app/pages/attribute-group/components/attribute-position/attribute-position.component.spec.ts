import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributePositionComponent } from './attribute-position.component';

describe('AttributePositionComponent', () => {
  let component: AttributePositionComponent;
  let fixture: ComponentFixture<AttributePositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttributePositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributePositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
