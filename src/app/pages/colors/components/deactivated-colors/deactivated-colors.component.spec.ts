import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeactivatedColorsComponent } from './deactivated-colors.component';

describe('DeactivatedColorsComponent', () => {
  let component: DeactivatedColorsComponent;
  let fixture: ComponentFixture<DeactivatedColorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeactivatedColorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeactivatedColorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
