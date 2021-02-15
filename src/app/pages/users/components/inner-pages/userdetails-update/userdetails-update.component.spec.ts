import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserdetailsUpdateComponent } from './userdetails-update.component';

describe('UserdetailsUpdateComponent', () => {
  let component: UserdetailsUpdateComponent;
  let fixture: ComponentFixture<UserdetailsUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserdetailsUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserdetailsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
