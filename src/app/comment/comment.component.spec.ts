import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentComponent } from './comment.component';
import { RouterTestingModule } from '../../../node_modules/@angular/router/testing';
import { RouterModule } from '../../../node_modules/@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '../../../node_modules/@angular/core';

describe('CommentComponent', () => {
  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CommentComponent],
      imports: [RouterModule, RouterTestingModule],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create comment component', () => {
    expect(component).toBeTruthy();
  });

});
