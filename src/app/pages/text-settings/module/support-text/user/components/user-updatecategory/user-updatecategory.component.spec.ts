import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserUpdatecategoryComponent } from './user-updatecategory.component';

describe('UserUpdatecategoryComponent', () => {
  let component: UserUpdatecategoryComponent;
  let fixture: ComponentFixture<UserUpdatecategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserUpdatecategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserUpdatecategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
