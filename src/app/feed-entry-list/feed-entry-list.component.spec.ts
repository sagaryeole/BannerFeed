import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedEntryListComponent } from './feed-entry-list.component';
import { RouterModule } from '../../../node_modules/@angular/router';
import { RouterTestingModule } from '../../../node_modules/@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '../../../node_modules/@angular/core';
import { FormsModule, FormGroup, ReactiveFormsModule } from '../../../node_modules/@angular/forms';
import { listingService } from '../service/listingService.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { by } from '../../../node_modules/protractor';
import { By } from '../../../node_modules/@angular/platform-browser';


describe('EntryListComponent', () => {
  let component: FeedEntryListComponent;
  let fixture: ComponentFixture<FeedEntryListComponent>;

  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations:
        [
          FeedEntryListComponent
        ],
      imports: [RouterModule, RouterTestingModule,
        FormsModule, ReactiveFormsModule,
        HttpClientTestingModule
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      providers: [
        listingService]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(FeedEntryListComponent)
        component = fixture.componentInstance;

        de = fixture.debugElement.query(By.css('form'));
        el = de.nativeElement;

      })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedEntryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create feen entry list component', () => {
    expect(component).toBeTruthy();
  });

  it('should be invalid', async(() => {
    component.searchForm.controls['FeedURL'].setValue('');
    expect(component.searchForm.valid).toBeFalsy();
  }))

  it('should be invalid', async(() => {
    component.searchForm.controls['FeedURL'].setValue('http://test');
    expect(component.searchForm.valid).toBeFalsy();
  }))


  it('should be invalid', async(() => {
    component.searchForm.controls['FeedURL'].setValue('https://www.reddit.com/r/{Topic Name}');
    expect(component.searchForm.valid).toBeTruthy();
    component.searchForm.controls['FeedURL'].setValue('https://www.reddit.com/r/Sweden');
    expect(component.searchForm.valid).toBeTruthy();
    component.searchForm.controls['FeedURL'].setValue('https://www.reddit.com/r/Sweden.json');
    expect(component.searchForm.valid).toBeTruthy();
  }))


  it('should be equal to 0', async(() => {

    //Set vale
    component.fillURL()
    //reset value
    component.fillURL()
    let urlvalue: string = component.searchForm.controls['FeedURL'].value
    expect(urlvalue.length).toEqual(0)

  }))

  it('should be greater than 0', async(() => {
    //Set value
    component.fillURL()
    let urlvalue: string = component.searchForm.controls['FeedURL'].value
    expect(urlvalue.length).toBeGreaterThan(0)
  }))

  it('should be toBeUndefined after service call by page url', async(() => {

    component.searchForm.controls['FeedURL'].setValue('https://www.reddit.com/r/Sweden.json');
    component.FetchEntry(component.searchForm.value)
  
    expect(component.dataSource).toBeUndefined()
  }))


  it('should be Undefined after service call by page size', async(() => {

    component.jsonURL='https://www.reddit.com/r/Sweden.json';
    component.callFetchEntry(10)  
    expect(component.dataSource).toBeUndefined()
  }))


  it('should Undefined after wrong feed url', async(() => {

    component.jsonURL='https://www.reddit.conm/r/Sweden.json';
    component.callFetchEntry(10)
    expect(component.dataSource).toBeUndefined()
  }))

  
  it('should set ShowNotFound to true', async(() => {
    component.handleError("test")
    expect(component.ShowNotFound).toBeTruthy()
  }))

  
  it('should set datasource to null', async(() => {
    component.handleError("test")
    expect(component.dataSource).toBeUndefined()
  }))

  
    
});
