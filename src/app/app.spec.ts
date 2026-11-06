import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { App } from './app';
import { SITE_PROFILE } from './config/site/site.config';
import { UI_TEXT } from './constants/common/ui-text.constants';
import { APP_ICONS } from './constants/ui/icons.constants';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([]), provideIcons(APP_ICONS)],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the owner name in the header', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('header')?.textContent).toContain(SITE_PROFILE.name);
  });

  it('should keep the header to navigation, without the hero actions', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const header = (fixture.nativeElement as HTMLElement).querySelector('header');
    expect(header?.textContent).toContain(UI_TEXT.nav.projects);
    expect(header?.textContent).toContain(UI_TEXT.nav.experience);
    expect(header?.textContent).toContain(UI_TEXT.nav.skills);
    expect(header?.querySelector('app-cv-download-button')).toBeNull();
  });
});
