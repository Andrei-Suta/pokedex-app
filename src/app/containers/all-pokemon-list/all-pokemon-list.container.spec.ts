import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { beforeEach, describe, expect, it } from 'vitest';

import { AllPokemonListContainer } from './all-pokemon-list.container';

describe('AllPokemonListContainer', () => {
    let component: AllPokemonListContainer;
    let fixture: ComponentFixture<AllPokemonListContainer>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [AllPokemonListContainer],
            providers: [provideRouter([])],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AllPokemonListContainer);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
