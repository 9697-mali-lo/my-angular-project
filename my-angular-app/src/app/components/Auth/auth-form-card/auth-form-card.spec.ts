import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthFormCard } from './auth-form-card';

describe('AuthFormCard', () => {
  let component: AuthFormCard;
  let fixture: ComponentFixture<AuthFormCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthFormCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthFormCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
