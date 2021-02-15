import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTagAddComponent } from './search-tag-add.component';

describe('SearchTagAddComponent', () => {
  let component: SearchTagAddComponent;
  let fixture: ComponentFixture<SearchTagAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchTagAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTagAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
