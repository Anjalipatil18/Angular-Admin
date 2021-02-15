import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportedTagsComponent } from './reported-tags.component';

describe('ReportedTagsComponent', () => {
  let component: ReportedTagsComponent;
  let fixture: ComponentFixture<ReportedTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportedTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportedTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
