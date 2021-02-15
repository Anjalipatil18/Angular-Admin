import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspendedPromotorsComponent } from './suspended-promotors.component';

describe('SuspendedPromotorsComponent', () => {
  let component: SuspendedPromotorsComponent;
  let fixture: ComponentFixture<SuspendedPromotorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuspendedPromotorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuspendedPromotorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
