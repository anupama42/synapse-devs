import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-skills',
  imports: [AsyncPipe],
  templateUrl: './skills.page.html',
})
export class SkillsPage {
  data$ = inject(ApiService).site();
}
