import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxesCommentsComponent } from './taxes-comments.component';

describe('TaxesCommentsComponent', () => {
  let component: TaxesCommentsComponent;
  let fixture: ComponentFixture<TaxesCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxesCommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxesCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
