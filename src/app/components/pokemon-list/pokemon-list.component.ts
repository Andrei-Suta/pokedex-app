import { AfterViewInit, Component, ElementRef, input, OnDestroy, output, viewChild } from '@angular/core';
import { SimplePokemon } from 'types/simple-pokemon.type';

import { PokemonListItemComponent } from '../pokemon-list-item/pokemon-list-item.component';

@Component({
    selector: 'app-pokemon-list',
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

        <div class="section-wrapper">
            <section>
                @for (pokemon of pokemonList(); let index = $index; track pokemon.name) {
                    <app-pokemon-list-item [index]="$index" [pokemon]="pokemon" />
                }
                <div #listEnd style="height: 1px;"></div>
            </section>
        </div>

        <footer></footer>
    `,
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
        }, { threshold: 0.1 });

        const anchorElement = this.listEnd()?.nativeElement;
        if (anchorElement) {
            this.observer.observe(anchorElement);
        }
    }

    ngOnDestroy() {
        this.observer?.disconnect();
    }
}
