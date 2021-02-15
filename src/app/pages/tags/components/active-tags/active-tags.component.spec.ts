import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveTagsComponent } from './active-tags.component';

describe('ActiveTagsComponent', () => {
  let component: ActiveTagsComponent;
  let fixture: ComponentFixture<ActiveTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
