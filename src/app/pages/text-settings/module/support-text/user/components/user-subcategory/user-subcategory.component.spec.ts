import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSubcategoryComponent } from './user-subcategory.component';

describe('UserSubcategoryComponent', () => {
  let component: UserSubcategoryComponent;
  let fixture: ComponentFixture<UserSubcategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSubcategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSubcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
