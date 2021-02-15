import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsViewsComponent } from './tags-views.component';

describe('TagsViewsComponent', () => {
  let component: TagsViewsComponent;
  let fixture: ComponentFixture<TagsViewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagsViewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
