import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteComponent } from './vote.component';
import { RouterModule } from '../../../node_modules/@angular/router';
import { RouterTestingModule } from '../../../node_modules/@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '../../../node_modules/@angular/core';

describe('VoteComponent', () => {
  let component: VoteComponent;
  let fixture: ComponentFixture<VoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoteComponent ],
      imports: [
        RouterModule, RouterTestingModule
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });   

  it('should have vote greather than original', () => {
    component.originalScore= component.Score = 10
    component.addVote(1);
    expect(component.Score).toBeGreaterThan(component.originalScore);    
  });

  
  it('should have vote equal to original', () => {
    component.originalScore= component.Score = 10
    component.addVote(1);
    component.addVote(-1);
    expect(component.Score).toEqual(component.originalScore);
  });

  
  it('should have vote less than original', () => {
    component.originalScore= component.Score = 10
    component.addVote(-1);
    expect(component.Score).toBeLessThan(component.originalScore);
  });
  
});
