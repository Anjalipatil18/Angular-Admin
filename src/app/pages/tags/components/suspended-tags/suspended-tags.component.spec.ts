import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspendedTagsComponent } from './suspended-tags.component';

describe('SuspendedTagsComponent', () => {
  let component: SuspendedTagsComponent;
  let fixture: ComponentFixture<SuspendedTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuspendedTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuspendedTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
