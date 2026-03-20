import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fanorona } from './fanorona';

describe('Fanorona', () => {
  let component: Fanorona;
  let fixture: ComponentFixture<Fanorona>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Fanorona]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Fanorona);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
