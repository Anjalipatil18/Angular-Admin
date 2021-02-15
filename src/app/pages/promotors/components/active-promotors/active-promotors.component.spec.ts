import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivePromotorsComponent } from './active-promotors.component';

describe('ActivePromotorsComponent', () => {
  let component: ActivePromotorsComponent;
  let fixture: ComponentFixture<ActivePromotorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivePromotorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivePromotorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
