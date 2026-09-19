import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ApiService } from '../api.service';
import { LoadingSpinnerComponent } from '../loading-spinner.component';

@Component({
  selector: 'app-skills',
  imports: [AsyncPipe, LoadingSpinnerComponent],
  templateUrl: './skills.page.html',
})
export class SkillsPage {
  data$ = inject(ApiService).site();
}
