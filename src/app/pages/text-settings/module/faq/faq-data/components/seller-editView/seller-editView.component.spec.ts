import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqEditViewComponent } from './seller-editView.component';

describe('FaqEditViewComponent', () => {
  let component: FaqEditViewComponent;
  let fixture: ComponentFixture<FaqEditViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FaqEditViewComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqEditViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
