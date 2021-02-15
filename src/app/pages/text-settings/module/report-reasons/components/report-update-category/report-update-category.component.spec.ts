import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportUpdateCategoryComponent } from './report-update-category.component';

describe('ReportUpdateCategoryComponent', () => {
  let component: ReportUpdateCategoryComponent;
  let fixture: ComponentFixture<ReportUpdateCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportUpdateCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportUpdateCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
