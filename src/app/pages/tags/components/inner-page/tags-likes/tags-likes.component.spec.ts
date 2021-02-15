import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsLikesComponent } from './tags-likes.component';

describe('TagsLikesComponent', () => {
  let component: TagsLikesComponent;
  let fixture: ComponentFixture<TagsLikesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagsLikesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsLikesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
