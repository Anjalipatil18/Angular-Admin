import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveUnitsComponent } from './active-units.component';

describe('ActiveUnitsComponent', () => {
  let component: ActiveUnitsComponent;
  let fixture: ComponentFixture<ActiveUnitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveUnitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveUnitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
