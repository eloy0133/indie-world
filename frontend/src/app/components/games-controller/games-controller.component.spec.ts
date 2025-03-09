import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesControllerComponent } from './games-controller.component';

describe('GamesControllerComponent', () => {
  let component: GamesControllerComponent;
  let fixture: ComponentFixture<GamesControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GamesControllerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GamesControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
