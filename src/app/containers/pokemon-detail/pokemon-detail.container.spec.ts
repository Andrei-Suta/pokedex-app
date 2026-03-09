import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideQueryClient, QueryClient } from '@tanstack/angular-query-experimental';
import { beforeEach, describe, expect, it } from 'vitest';

import { PokemonDetailContainer } from './pokemon-detail.container';

describe('PokemonDetailContainer', () => {
    let component: PokemonDetailContainer;
    let fixture: ComponentFixture<PokemonDetailContainer>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [PokemonDetailContainer],
            providers: [provideQueryClient(new QueryClient()), provideHttpClient()],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PokemonDetailContainer);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
