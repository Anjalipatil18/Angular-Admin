import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTagEditComponent } from './search-tag-edit.component';

describe('SearchTagEditComponent', () => {
  let component: SearchTagEditComponent;
  let fixture: ComponentFixture<SearchTagEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchTagEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTagEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
