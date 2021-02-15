import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveAttributesComponent } from './active-attributes.component';

describe('ActiveAttributesComponent', () => {
  let component: ActiveAttributesComponent;
  let fixture: ComponentFixture<ActiveAttributesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveAttributesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
