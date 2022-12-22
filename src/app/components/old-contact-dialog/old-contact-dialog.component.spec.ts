import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OldContactDialogComponent } from './old-contact-dialog.component';

describe('OldContactDialogComponent', () => {
  let component: OldContactDialogComponent;
  let fixture: ComponentFixture<OldContactDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OldContactDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OldContactDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
