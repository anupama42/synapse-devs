import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../api.service';
import { LoadingSpinnerComponent } from '../loading-spinner.component';

@Component({
  selector: 'app-services',
  imports: [AsyncPipe, RouterLink, LoadingSpinnerComponent],
  templateUrl: './services.page.html',
})
export class ServicesPage {
  data$ = inject(ApiService).site();
}
