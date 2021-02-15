import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersTagsComponent } from './users-tags.component';

describe('UsersTagsComponent', () => {
  let component: UsersTagsComponent;
  let fixture: ComponentFixture<UsersTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
