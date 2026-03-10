import { AfterViewInit, Component, ElementRef, input, OnDestroy, output, viewChild } from '@angular/core';
import { SimplePokemon } from 'types/simple-pokemon.type';

import { PokemonListItemComponent } from '../pokemon-list-item/pokemon-list-item.component';

@Component({
    selector: 'app-pokemon-list',
    template: `
        <div class="flex flex-grow max-h-[calc(100%-76px)] -mt-[48px] pt-10 pb-[32px] px-[32px] bg-[#d71f06] rounded-bl-[32px]">

            <section class="screen-inset-shadow flex flex-col flex-grow bg-black text-white overflow-auto p-[8px] rounded-[32px] rounded-bl-[16px] rounded-tr-none">
                @for (pokemon of pokemonList(); let index = $index; track pokemon.name) {
                    <app-pokemon-list-item [index]="$index" [pokemon]="pokemon" />
                }
                <div #listEnd class="h-4 w-full bg-transparent">
                </div>    
            </section>  
        </div>
        <footer></footer>
    `,
    host: {
        class: 'flex flex-col'
    },
    styleUrl: './pokemon-list.component.scss',
    imports: [PokemonListItemComponent],
})
export class PokemonListComponent implements AfterViewInit, OnDestroy {
    readonly pokemonList = input<SimplePokemon[]>([]);
    readonly scrolledToBottom = output<void>();
    private listEnd = viewChild<ElementRef>('listEnd');
    private observer?: IntersectionObserver;

    ngAfterViewInit() {
        this.observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                this.scrolledToBottom.emit();
            }
        }, { threshold: 0.0001 });

        const anchorElement = this.listEnd()?.nativeElement;
        if (anchorElement) {
            this.observer.observe(anchorElement);
        }
    }

    ngOnDestroy() {
        this.observer?.disconnect();
    }
}
