import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { PokemonListComponent } from './pokemon-list.component';

describe('PokemonListComponent', () => {
    let component: PokemonListComponent;
    let fixture: ComponentFixture<PokemonListComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [PokemonListComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PokemonListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
