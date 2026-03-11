import { Component, inject } from '@angular/core';
import { LoaderService } from 'services/loader-service/loader.service';

@Component({
    selector: 'app-global-loader',
    imports: [],
    templateUrl: './global-loader.component.html',
    styleUrl: './global-loader.component.less',
    styles: [`
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    .animate-spin {
      animation: spin 0.8s linear infinite;
    }
  `]
})
export class GlobalLoaderComponent {
    protected loader = inject(LoaderService);
}
