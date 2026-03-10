import { injectTwHostClass } from 'util/inject-tw-host-class.util';

import { HttpClient } from '@angular/common/http';
import { Component, inject, input, signal } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { firstValueFrom } from 'rxjs';
import { PokemonMoveDetails } from 'types/pokemon-move-details.type';
import { Pokemon } from 'types/pokemon.type';
import { PokemonInfoComponent } from '../../components/pokemon-info/pokemon-info.component';

type Tab = 'stats' | 'abilities' | 'moves' | 'evolutions';

@Component({
    selector: 'app-pokemon-detail',
    imports: [PokemonInfoComponent],
    styles: [`header {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    z-index: 2;
}

.nav-shadow {
    z-index: 1;

    position: absolute;
    left: 0;
    bottom: 0;
    width: 24px;
    box-shadow: 4px 4px 8px 4px rgba(0, 0, 0, 0.5);
}

nav {
    z-index: 2;
    display: flex;
    flex-direction: row;
    background: #d71f06;
    padding: 32px 64px 32px 30px;

    clip-path: polygon(100% 0, 100% 5rem, 6rem 100%, 0 100%, 0 0);

    border-top-left-radius: 16px;
    border-bottom-right-radius: 16px;
}

.top-bar {
    display: flex;
    flex-grow: 1;
    height: 80px;
    padding: 20px 0;
    margin-left: -16px;
    z-index: 2;
    background: rgb(215, 31, 6);
    background: rgb(215, 31, 6);
    background: linear-gradient(
        133deg,
        rgba(215, 31, 6, 1) 0%,
        rgba(215, 31, 6, 1) 40%,
        rgba(226, 88, 70, 1) 60%,
        rgba(215, 31, 6, 1) 100%
    );
    box-shadow: 32px 8px 8px 0px rgba(0, 0, 0, 0.5);
}

.big-button {
    height: 60px;
    width: 60px;
    border-radius: 50%;

    border: 4px solid white;
    box-shadow: 0 0 8px 2px rgba(0, 0, 0, 0.1);
}

.small-button {
    height: 12px;
    width: 12px;
    border-radius: 50%;
    margin: 0 4px;
    border: 1px solid rgba(0, 0, 0, 0.1);
}

.blue {
    background: radial-gradient(#9af0ff, #12b2d6);
}
.green {
    background: radial-gradient(#b0fb7b, #50fb05);
}
.yellow {
    background: radial-gradient(#ffdc26, #f3b438);
}
.red {
    background: radial-gradient(#da181f, #b90a0a);
}`],
    template: `
        <header>
            <nav>
                <button class="big-button blue"></button>
            </nav>
            <div class="nav-shadow"></div>

            <div class="top-bar">
                <button class="small-button red"></button>
                <button class="small-button yellow"></button>
                <button class="small-button green"></button>
            </div>
        </header>
        <div class="w-full text-black h-[200px] p-2 rounded-md shadow-inner flex items-center justify-center">
            @if (currentPokemonInfo.data(); as pokemon) {
                <app-pokemon-info [pokemonInfo]="pokemon" />
            }
        </div>

        <div class="flex flex-row gap-2 px-2.5 py-0">
            @for (tab of ['stats', 'abilities', 'moves']; track tab) {
                <button
                    (click)="changeTab(tab)"
                    [class.bg-gray-400]="activeTab() === tab"
                    [class.bg-gray-300]="activeTab() !== tab"
                    class="flex-auto p-2 rounded-md capitalize transition-colors font-bold text-white-800 transition-colors duration-300 delay-150 hover:bg-cyan-350"
                >
                    {{ tab }}
                </button>
            }
        </div>

        <div class="grow bg-black m-[5px] rounded-md shadow-md overflow-y-auto">
            @if (currentPokemonInfo.data(); as pokemon) {
                @switch (activeTab()) {
                   @case ('stats') {
                        <div class="flex flex-row items-end justify-between h-40 gap-3 p-4 bg-black rounded-lg">

                            @for (s of pokemon.stats; track s.stat.name) {
                                <div class="flex flex-col items-center flex-1 h-full">

                                    <span class="text-[10px] text-yellow-200 font-bold mb-1">{{ s.base_stat }}</span>

                                    <div class="relative w-full flex-1 bg-gray-200 border border-gray-300 overflow-hidden">

                                        <div class="absolute bottom-0 left-0 w-full bg-blue-600 transition-all duration-500"
                                            [style.height.%]="s.base_stat">
                                        </div>

                                        <div class="absolute inset-0 flex flex-col">
                                            @for (i of [1,2,3,4,5,6,7,8,9,10]; track i) {
                                                <div class="flex-1 w-full border-b-[2px] border-white last:border-b-0"></div>
                                            }
                                        </div>

                                    </div>

                                    <span class="text-[9px] mt-2 font-black uppercase text-yellow-200">
                                        {{ s.stat.name.slice(0, 3) }}
                                    </span>
                                </div>
                            }
                        </div>
                    }
                    @case ('abilities') {
                        <div class="p-4 bg-black text-yellow-200 font-mono flex flex-col gap-4">
                            <div class="flex justify-around border-2 border-yellow-500/20 p-2 rounded-md">
                                <div class="text-center">
                                    <p class="text-[10px] text-gray-400 uppercase">Height</p>
                                    <p class="font-bold">{{ pokemon.height / 10 }} m</p>
                                </div>
                                <div class="text-center">
                                    <p class="text-[10px] text-gray-400 uppercase">Weight</p>
                                    <p class="font-bold">{{ pokemon.weight / 10 }} kg</p>
                                </div>
                            </div>

                            <div>
                                <p class="text-[10px] text-gray-400 uppercase mb-1">Abilities</p>
                                <div class="flex flex-wrap gap-2">
                                    @for (a of pokemon.abilities; track a.ability.name) {
                                        <span class="px-2 py-1 border border-yellow-500 rounded text-xs capitalize italic">
                                            {{ a.ability.name.replace('-', ' ') }}
                                        </span>
                                    }
                                </div>
                            </div>

                            <div>
                                <p class="text-[10px] text-gray-400 uppercase mb-1">Types</p>
                                <div class="flex gap-2">
                                    @for (t of pokemon.types; track t.type.name) {
                                        <span [class]="'px-3 py-0.5 rounded border border-black text-white text-[10px] font-bold uppercase ' + t.type.name">
                                            {{ t.type.name }}
                                        </span>
                                    }
                                </div>
                            </div>
                        </div>
                    }
                    @case ('moves') {
                        <div class="flex flex-col gap-2 p-2 bg-black max-h-[350px] font-mono">
                            @if (movesDetails.isPending()) {
                                <div class="text-yellow-200 text-center animate-pulse">Loading moves...</div>
                            } @else {
                                @for (details of movesDetails.data(); track details.name) {
                                    <div class="flex flex-col border border-yellow-500/30 p-2 rounded bg-gray-900 shadow-sm">
                                        <div class="flex justify-between items-center">
                                            <span class="capitalize font-bold text-yellow-200 text-sm">{{ details.name.replace('-', ' ') }}</span>
                                            <span [class]="'text-[9px] px-2 py-0.5 rounded border border-black text-white font-bold uppercase ' + details.type.name">
                                                {{ details.type.name }}
                                            </span>
                                        </div>

                                        <div class="flex gap-4 mt-1 text-[10px] text-gray-400 italic">
                                            <span>Pwr: {{ details.power || '--' }}</span>
                                            <span>Acc: {{ details.accuracy || '--' }}%</span>
                                            <span class="capitalize ml-auto">{{ details.damage_class.name }}</span>
                                        </div>
                                    </div>
                                }
                            }
                        </div>
                    }
                }
            }
        </div>
    `,
})
export class PokemonDetailContainer {
    private readonly httpClient = inject(HttpClient);
    public readonly pokemonId = input<string>('bulbasaur');
    protected readonly tabs: Tab[] = ['stats', 'abilities', 'moves'];
    readonly activeTab = signal<Tab>('stats');

    readonly currentPokemonInfo = injectQuery(() => ({
        queryKey: ['pokemon', this.pokemonId()],
        queryFn: () =>
            // TODO: use https://github.com/PokeAPI/pokeapi-js-wrapper instead?
            firstValueFrom(this.httpClient.get<Pokemon>(`/api/v2/pokemon/${this.pokemonId()}`)),
    }));

    readonly speciesInfo = injectQuery(() => ({
        queryKey: ['pokemon-species', this.pokemonId()],
        enabled: !!this.pokemonId(),
        queryFn: () => firstValueFrom(this.httpClient.get<any>(`https://pokeapi.co/api/v2/pokemon-species/${this.pokemonId()}/`)),
    }));

    readonly movesDetails = injectQuery(() => {
        const pokemon = this.currentPokemonInfo.data();
        const isActive = this.activeTab() === 'moves';

        return {
            queryKey: ['pokemon-moves-details', pokemon?.id],
            enabled: !!pokemon && isActive,
            queryFn: async () => {
                const moveRequests = pokemon!.moves.slice(0, 20).map(m =>
                    firstValueFrom(this.httpClient.get<PokemonMoveDetails>(m.move.url))
                );
                return Promise.all(moveRequests);
            }
        };
    });

    constructor() {
        injectTwHostClass(() => 'flex flex-col gap-2');
    }

    public changeTab(tab: string): void {
        this.activeTab.set(tab as Tab);
    }
}
