import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservarTurnoComponent } from './reservar-turno.component';

describe('ReservarTurnoComponent', () => {
  let component: ReservarTurnoComponent;
  let fixture: ComponentFixture<ReservarTurnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservarTurnoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservarTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
