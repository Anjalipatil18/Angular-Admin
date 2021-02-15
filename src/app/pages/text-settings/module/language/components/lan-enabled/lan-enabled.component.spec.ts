import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanEnabledComponent } from './lan-enabled.component';

describe('LanEnabledComponent', () => {
  let component: LanEnabledComponent;
  let fixture: ComponentFixture<LanEnabledComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanEnabledComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanEnabledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
