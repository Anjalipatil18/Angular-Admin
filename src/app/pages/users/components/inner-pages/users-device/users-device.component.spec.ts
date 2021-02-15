import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersDeviceComponent } from './users-device.component';

describe('UsersDeviceComponent', () => {
  let component: UsersDeviceComponent;
  let fixture: ComponentFixture<UsersDeviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersDeviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
