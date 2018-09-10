import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedEntryComponent } from './feed-entry.component';
import { RouterModule } from '../../../node_modules/@angular/router';
import { RouterTestingModule } from '../../../node_modules/@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '../../../node_modules/@angular/core';

describe('FeedEntryComponent', () => {
  let component: FeedEntryComponent;
  let fixture: ComponentFixture<FeedEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedEntryComponent ],
      imports: [RouterModule, RouterTestingModule],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create feed entry component', () => {
    expect(component).toBeTruthy();
  });
});
