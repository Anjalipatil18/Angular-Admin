import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersProductsSharedComponent } from './users-productsShared.component';

describe('UsersProductsSharedComponent', () => {
  let component: UsersProductsSharedComponent;
  let fixture: ComponentFixture<UsersProductsSharedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UsersProductsSharedComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersProductsSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
