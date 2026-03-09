import { Component, computed, input } from '@angular/core';

@Component({
    selector: 'app-typewriter',
    template: `
        @if (typeWriterText()) {
            <p>{{ typeWriterText() }}</p>
        }
    `,
    styleUrl: './typewriter.component.scss',
})
export class TypewriterComponent {
    readonly text = input<string>(undefined);

    readonly typeWriterText = computed(() => this.text());
}
