import { Component, input } from '@angular/core';
import { Pokemon } from 'types/pokemon.type';

import { TypewriterComponent } from '../../typewriter/typewriter.component';

@Component({
    selector: 'app-pokemon-info',
    imports: [TypewriterComponent],
    template: `
        <div class="display-flex">
            <button class="small-button red"></button>
            <button class="small-button red"></button>
        </div>
        <div class="sprite-wrapper">
            <div class="pokedex-screen">
                <div class="pokemon-container">
                @if (pokemonInfo(); as pokemonInfo) {
                    <div
                        class="sprite"
                        [style.background-image]="'url(' + pokemonInfo.sprites['front_default'] + ')'"
                    ></div>
                }
                </div>
            </div>
            <app-typewriter [text]="pokemonInfo()?.name" />

        </div>
    `,
    host: {
        class: 'block relative w-[50%] h-full bg-white pt-0 px-[25px] pb-[25px]'
    },
    styleUrl: './pokemon-info.component.scss',
})
export class PokemonInfoComponent {
    readonly pokemonInfo = input<Pokemon>();
}
