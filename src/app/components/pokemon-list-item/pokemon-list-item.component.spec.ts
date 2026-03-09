import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { beforeEach, describe, expect, it } from 'vitest';

import { PokemonListItemComponent } from './pokemon-list-item.component';

describe('PokemonListItemComponent', () => {
    let component: PokemonListItemComponent;
    let fixture: ComponentFixture<PokemonListItemComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [PokemonListItemComponent],
            providers: [provideRouter([])],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PokemonListItemComponent, { bindings: [] });
        fixture.componentRef.setInput('pokemon', { id: '1', name: 'bulbasaur' });
        fixture.componentRef.setInput('index', 1);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
