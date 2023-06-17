import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserFormComponent } from './user-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatSnackBarModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: () => '1' }),
          },
        },
      ],
      declarations: [UserFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with the expected form controls', () => {
    expect(component.form.get('name')).toBeTruthy();
    expect(component.form.get('email')).toBeTruthy();
    expect(component.form.get('password')).toBeTruthy();
  });

  it('should show an error message for the name field if it is invalid', () => {
    component.form.get('name')?.markAsTouched();
    fixture.detectChanges();

    const errorMessageEl = fixture.nativeElement.querySelector('.mat-error');
    if (errorMessageEl) {
      const errorMessage = errorMessageEl.textContent;
      expect(errorMessage).toContain('Nome é obrigatório');
    }
  });

  it('should show an error message for the email field if it is invalid', () => {
    component.form.get('email')?.markAsTouched();
    fixture.detectChanges();

    const errorMessageEl = fixture.nativeElement.querySelector('.mat-error');
    if (errorMessageEl) {
      const errorMessage = errorMessageEl.textContent;
      expect(errorMessage).toContain('Email é obrigatório');
    }
  });

  it('should show an error message for the password field if it is invalid', () => {
    component.form.get('password')?.markAsTouched();
    fixture.detectChanges();

    const errorMessageEl = fixture.nativeElement.querySelector('.mat-error');
    if (errorMessageEl) {
      const errorMessage = errorMessageEl.textContent;
      expect(errorMessage).toContain('Password é obrigatório');
    }
  });
});
