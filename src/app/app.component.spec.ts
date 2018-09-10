import { TestBed, async } from '@angular/core/testing';
import {RouterModule    } from '@angular/router';
import {RouterTestingModule  } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { appRouts } from './routs';
import { CUSTOM_ELEMENTS_SCHEMA } from '../../node_modules/@angular/core';
import { ReactiveFormsModule, FormsModule } from '../../node_modules/@angular/forms';
import { listingService } from './service/listingService.service';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        RouterTestingModule,
       RouterModule,
       ReactiveFormsModule,
       FormsModule
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
    providers: [
      listingService]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
