import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ThemeService } from '../../services/theme.service';
import { of } from 'rxjs';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let themeServiceSpy: jasmine.SpyObj<ThemeService>;
  let translateService: TranslateService;

  beforeEach(async () => {
    themeServiceSpy = jasmine.createSpyObj('ThemeService', ['setDarkMode'], {
      isDarkMode$: of(false), 
    });

    await TestBed.configureTestingModule({
      imports: [
        HeaderComponent,
        TranslateModule.forRoot()
      ],
      providers: [
        provideHttpClientTesting(),
        { provide: ThemeService, useValue: themeServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    translateService = TestBed.inject(TranslateService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render header element with class "header"', () => {
    const headerElement = fixture.nativeElement.querySelector('.header');
    expect(headerElement).toBeTruthy();
  });

  it('should display light mode logo when isDarkMode is false', () => {
    component.isDarkMode = false;
    fixture.detectChanges();
    const logo = fixture.nativeElement.querySelector('img[alt="Logo Sanalyz Bleu Marine"]');
    expect(logo).toBeTruthy();
  });

  it('should display dark mode logo when isDarkMode is true', () => {
    component.isDarkMode = true;
    fixture.detectChanges();
    const logo = fixture.nativeElement.querySelector('img[alt="Logo Sanalyz Blanc"]');
    expect(logo).toBeTruthy();
  });

  it('should call themeService.setDarkMode() on toggleTheme()', () => {
    component.toggleTheme();
    expect(themeServiceSpy.setDarkMode).toHaveBeenCalledWith(true);
    component.toggleTheme();
    expect(themeServiceSpy.setDarkMode).toHaveBeenCalledWith(false);
  });

  it('should toggle locale and update localeIcon', () => {
    const initialIcon = component.localeIcon;
    component.toggleLocale();
    fixture.detectChanges();

    const updatedIcon = component.localeIcon;
    expect(updatedIcon).not.toBe(initialIcon);
  });

  it('should unsubscribe on ngOnDestroy()', () => {
    const unsubscribeSpy = spyOn(component['subscription'], 'unsubscribe');
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});
