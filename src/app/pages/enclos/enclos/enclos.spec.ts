import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Enclos } from './enclos';

describe('Enclos', () => {
  let component: Enclos;
  let fixture: ComponentFixture<Enclos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Enclos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Enclos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
