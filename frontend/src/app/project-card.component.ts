import { Component, Input, inject } from '@angular/core';
import { projectCopy } from './i18n/copy';
import { LanguageService } from './i18n/language.service';
import { Project } from './models';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss',
})
export class ProjectCardComponent {
  private i18n = inject(LanguageService);

  @Input({ required: true }) project!: Project;

  get thumbnailSrc(): string {
    return this.project.thumbnail || `/projects/${this.project.slug}.png`;
  }

  text(field: 'category' | 'shortDescription' | 'description' | 'role' | 'highlight'): string {
    const value = this.project[field] || '';
    return projectCopy(this.i18n.lang(), this.project.slug, field, value);
  }

  openLabel(): string {
    return this.i18n.t('project.open', { name: this.project.name });
  }

  altLabel(): string {
    const key = this.project.liveUrl ? 'project.homepage' : 'project.preview';
    return this.i18n.t(key, { name: this.project.name });
  }
}
