import { UpperCasePipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';

@Component({
    selector: 'app-typewriter',
    template: `
        @if (typeWriterText()) {
            <p class="text-center">{{ typeWriterText() | uppercase }}</p>
        }
    `,
    imports: [UpperCasePipe],
    styleUrl: './typewriter.component.scss',
})
export class TypewriterComponent {
    readonly text = input<string>(undefined);

    readonly typeWriterText = computed(() => this.text());
}
