import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveColorsComponent } from './active-colors.component';

describe('ActiveColorsComponent', () => {
  let component: ActiveColorsComponent;
  let fixture: ComponentFixture<ActiveColorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveColorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveColorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
