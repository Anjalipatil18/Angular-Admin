import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeactivatedTagsComponent } from './deactivated-tags.component';

describe('DeactivatedTagsComponent', () => {
  let component: DeactivatedTagsComponent;
  let fixture: ComponentFixture<DeactivatedTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeactivatedTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeactivatedTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
