import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditodosComponent } from './editodos.component';

describe('EditodosComponent', () => {
  let component: EditodosComponent;
  let fixture: ComponentFixture<EditodosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditodosComponent]
    });
    fixture = TestBed.createComponent(EditodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
