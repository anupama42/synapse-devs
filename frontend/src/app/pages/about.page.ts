import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../api.service';
import { LoadingSpinnerComponent } from '../loading-spinner.component';

@Component({
  selector: 'app-about',
  imports: [AsyncPipe, RouterLink, LoadingSpinnerComponent],
  templateUrl: './about.page.html',
  styleUrl: './about.page.scss',
})
export class AboutPage {
  data$ = inject(ApiService).site();
}
