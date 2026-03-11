import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SimplePokemon } from 'types/simple-pokemon.type';

@Component({
    selector: 'app-pokemon-list-item',
    template: `
        <a
        [routerLink]="['', { outlets: { detail: [pokemon().name] } }]"
        routerLinkActive="bg-yellow-200 !text-black shadow-[inset_4px_0_0_0_#000]"
        [routerLinkActiveOptions]="{ exact: true }"
        class="block p-2 rounded text-white no-underline transition-colors duration-200
                hover:not-[.bg-yellow-200]:bg-white/30"
        >
            <span class="font-mono opacity-70">{{ (index() + 1).toString().padStart(3, '0') }}</span>
            <span class="ml-2 uppercase font-bold">{{ pokemon().name }}</span>
        </a>
    `,
    styleUrl: './pokemon-list-item.component.scss',
    imports: [RouterLink, RouterLinkActive],
})
export class PokemonListItemComponent {
    readonly index = input.required<number>();
    readonly pokemon = input.required<SimplePokemon>();
}
