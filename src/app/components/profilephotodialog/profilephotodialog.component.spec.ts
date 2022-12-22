import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilephotodialogComponent } from './profilephotodialog.component';

describe('ProfilephotodialogComponent', () => {
  let component: ProfilephotodialogComponent;
  let fixture: ComponentFixture<ProfilephotodialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilephotodialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilephotodialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
