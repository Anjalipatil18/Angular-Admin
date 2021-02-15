import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeactivatedPromotorsComponent } from './deactivated-promotors.component';

describe('DeactivatedPromotorsComponent', () => {
  let component: DeactivatedPromotorsComponent;
  let fixture: ComponentFixture<DeactivatedPromotorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeactivatedPromotorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeactivatedPromotorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
