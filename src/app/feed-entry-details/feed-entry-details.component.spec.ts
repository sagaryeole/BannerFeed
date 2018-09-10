import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedEntryDetailsComponent } from './feed-entry-details.component';
import { RouterModule } from '../../../node_modules/@angular/router';
import { RouterTestingModule } from '../../../node_modules/@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '../../../node_modules/@angular/core';
import { listingService } from '../service/listingService.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('FeedEntryDetailsComponent', () => {
  let component: FeedEntryDetailsComponent;
  let fixture: ComponentFixture<FeedEntryDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedEntryDetailsComponent ]
      ,
      imports: [RouterModule, RouterTestingModule ,
        HttpClientTestingModule],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
    providers: [
      listingService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedEntryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create feed entry details component', () => {
    expect(component).toBeTruthy();
  });

  
  it('should set ShowNotFound to true', async(() => {
    component.handleError("test")
    expect(component.ShowNotFound).toBeTruthy()
  }))

  
  it('should set childData to null', async(() => {
    component.handleError("test")
    expect(component.childData).toBeUndefined()
  }))


  
  it('should set commentData to null', async(() => {
    component.handleError("test")
    expect(component.commentData).toBeUndefined()
  }))

  
  it('should set datasource to null', async(() => {
    component.handleError("test")
    expect(component.ShowNotFound).toBeTruthy()
  }))

});
