import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SwaggerComponent } from './swagger.component';
import { TranslateModule } from '@ngx-translate/core';

describe('SwaggerComponent', () => {
  let component: SwaggerComponent;
  let fixture: ComponentFixture<SwaggerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwaggerComponent, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(SwaggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render swagger container with iframe', () => {
    const container = fixture.nativeElement.querySelector('.swagger-container');
    expect(container).toBeTruthy();

    const iframe = container.querySelector('iframe');
    expect(iframe).toBeTruthy();
    expect(iframe.src).toContain('swagger-ui/index.html');
  });
});
