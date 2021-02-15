import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotorsComponent } from './promotors.component';

describe('PromotorsComponent', () => {
  let component: PromotorsComponent;
  let fixture: ComponentFixture<PromotorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromotorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
