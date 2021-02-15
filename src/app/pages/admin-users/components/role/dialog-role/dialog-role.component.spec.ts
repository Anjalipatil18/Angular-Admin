import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRoleComponent } from './dialog-role.component';

describe('DialogRoleComponent', () => {
  let component: DialogRoleComponent;
  let fixture: ComponentFixture<DialogRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
