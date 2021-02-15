import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveVerifiedComponent } from './active-verified.component';

describe('ActiveVerifiedComponent', () => {
  let component: ActiveVerifiedComponent;
  let fixture: ComponentFixture<ActiveVerifiedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveVerifiedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveVerifiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
