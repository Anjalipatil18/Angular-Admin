import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspendedScenesComponent } from './suspended-scenes.component';

describe('SuspendedScenesComponent', () => {
  let component: SuspendedScenesComponent;
  let fixture: ComponentFixture<SuspendedScenesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuspendedScenesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuspendedScenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
