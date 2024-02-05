import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestdocComponent } from './testdoc.component';

describe('TestdocComponent', () => {
  let component: TestdocComponent;
  let fixture: ComponentFixture<TestdocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestdocComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestdocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
