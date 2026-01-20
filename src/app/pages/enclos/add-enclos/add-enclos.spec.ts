import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEnclos } from './add-enclos';

describe('AddEnclos', () => {
  let component: AddEnclos;
  let fixture: ComponentFixture<AddEnclos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEnclos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEnclos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
