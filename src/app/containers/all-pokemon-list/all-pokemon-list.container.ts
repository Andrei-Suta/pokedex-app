import { Component, inject, OnInit, signal } from '@angular/core';
import { SimplePokemon } from 'types/simple-pokemon.type';

import { PokemonService } from 'services/pokemon-service/pokemon.service';
import { PokemonListComponent } from '../../components/pokemon-list/pokemon-list.component';

@Component({
    selector: 'app-all-pokemon-list',
    imports: [PokemonListComponent],
    providers: [PokemonService],
    template: ` <app-pokemon-list [pokemonList]="allPokemon()" (scrolledToBottom)="loadNextPage()"/> `,
})
export class AllPokemonListContainer implements OnInit {
    private readonly pokemonService = inject(PokemonService);
    allPokemon = signal<SimplePokemon[]>([]);
    nextPageUrl = signal<string | null>(null);

    ngOnInit() {
        this.loadNextPage();
    }

    loadNextPage() {
        const url = this.nextPageUrl() ?? undefined;

        this.pokemonService.getPokemon(url).subscribe((response) => {
            this.allPokemon.update(current => [...current, ...response.results]);
            this.nextPageUrl.set(response.next);
        });
    }
}


