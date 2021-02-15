import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTagsPageComponent } from './search-tags-page.component';

describe('SearchTagsPageComponent', () => {
  let component: SearchTagsPageComponent;
  let fixture: ComponentFixture<SearchTagsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchTagsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTagsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
