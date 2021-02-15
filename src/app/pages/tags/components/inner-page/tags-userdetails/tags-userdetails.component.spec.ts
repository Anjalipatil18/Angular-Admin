import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsUserdetailsComponent } from './tags-userdetails.component';

describe('TagsUserdetailsComponent', () => {
  let component: TagsUserdetailsComponent;
  let fixture: ComponentFixture<TagsUserdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagsUserdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsUserdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
