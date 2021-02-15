import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributeDragDropComponent } from './attribute-drag-drop.component';

describe('AttributeDragDropComponent', () => {
  let component: AttributeDragDropComponent;
  let fixture: ComponentFixture<AttributeDragDropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttributeDragDropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributeDragDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
