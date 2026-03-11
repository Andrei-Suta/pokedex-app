import { injectTwHostClass } from 'util/inject-tw-host-class.util';

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GlobalLoaderComponent } from 'components/global-loader/global-loader.component';

@Component({
    selector: 'app-layout',
    imports: [RouterOutlet, GlobalLoaderComponent],
    template: `
        <app-global-loader />
        <div class="pokemon-detail-wrapper">
            <router-outlet name="detail"></router-outlet>
        </div>
        <div class="divider"><div class="divider-hl"></div></div>
        <div class="pokemon-list">
            <router-outlet></router-outlet>
        </div>
    `,
    styleUrl: './layout.component.scss',
})
export class LayoutComponent {
    constructor() {
        injectTwHostClass(() => 'max-w-screen-2xl h-full mx-auto flex flex-row px-40 py-15');
    }
}
