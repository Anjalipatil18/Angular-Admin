import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportedScenesComponent } from './reported-scenes.component';

describe('ReportedScenesComponent', () => {
  let component: ReportedScenesComponent;
  let fixture: ComponentFixture<ReportedScenesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportedScenesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportedScenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
