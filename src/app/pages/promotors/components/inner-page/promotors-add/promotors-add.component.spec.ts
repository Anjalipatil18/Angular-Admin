import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotorsAddComponent } from './promotors-add.component';

describe('PromotorsAddComponent', () => {
  let component: PromotorsAddComponent;
  let fixture: ComponentFixture<PromotorsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromotorsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotorsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
