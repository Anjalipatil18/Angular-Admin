import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanDisabledComponent } from './lan-disabled.component';

describe('LanDisabledComponent', () => {
  let component: LanDisabledComponent;
  let fixture: ComponentFixture<LanDisabledComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanDisabledComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanDisabledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
