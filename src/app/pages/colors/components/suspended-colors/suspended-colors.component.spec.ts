import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspendedColorsComponent } from './suspended-colors.component';

describe('SuspendedColorsComponent', () => {
  let component: SuspendedColorsComponent;
  let fixture: ComponentFixture<SuspendedColorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuspendedColorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuspendedColorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
