import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsCommentsComponent } from './tags-comments.component';

describe('TagsCommentsComponent', () => {
  let component: TagsCommentsComponent;
  let fixture: ComponentFixture<TagsCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagsCommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
