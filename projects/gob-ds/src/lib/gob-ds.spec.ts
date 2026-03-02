import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GobDs } from './gob-ds';

describe('GobDs', () => {
  let component: GobDs;
  let fixture: ComponentFixture<GobDs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GobDs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GobDs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
