import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ApiService } from '../api.service';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function emailAddress(control: AbstractControl): ValidationErrors | null {
  const value = String(control.value ?? '').trim();
  if (!value) return { required: true };
  if (!EMAIL_PATTERN.test(value)) return { email: true };
  return null;
}

@Component({
  selector: 'app-contact',
  imports: [AsyncPipe, ReactiveFormsModule],
  templateUrl: './contact.page.html',
  styleUrl: './contact.page.scss',
})
export class ContactPage {
  private api = inject(ApiService);
  private fb = inject(FormBuilder);
  data$ = this.api.site();
  status: 'idle' | 'sending' | 'sent' | 'activate' | 'error' = 'idle';
  errorText = '';
  attempted = false;

  form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, emailAddress]],
    message: ['', Validators.required],
  });

  showError(field: 'name' | 'email' | 'message') {
    const control = this.form.controls[field];
    return control.invalid && (control.touched || this.attempted);
  }

  emailHint() {
    const control = this.form.controls.email;
    if (control.hasError('required')) return 'Email is required.';
    if (control.hasError('email')) return 'Enter a valid email, like name@gmail.com.';
    return '';
  }

  submit() {
    this.attempted = true;
    this.status = 'idle';
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }
    this.status = 'sending';
    const payload = {
      name: this.form.controls.name.value.trim(),
      email: this.form.controls.email.value.trim(),
      message: this.form.controls.message.value.trim(),
    };
    this.api.sendContact(payload).subscribe({
      next: (res) => {
        this.status = res.needsActivation ? 'activate' : 'sent';
        this.attempted = false;
        this.form.reset();
      },
      error: (err) => {
        this.status = 'error';
        this.errorText = err?.error?.error || 'Could not send. Email synapsedevs94@gmail.com instead.';
      },
    });
  }
}
