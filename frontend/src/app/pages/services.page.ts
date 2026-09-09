import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-services',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './services.page.html',
})
export class ServicesPage {
  data$ = inject(ApiService).site();
}
