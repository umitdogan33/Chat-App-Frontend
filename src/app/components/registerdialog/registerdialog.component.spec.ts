import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterdialogComponent } from './registerdialog.component';

describe('RegisterdialogComponent', () => {
  let component: RegisterdialogComponent;
  let fixture: ComponentFixture<RegisterdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterdialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
