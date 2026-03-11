import { ComponentFixture, TestBed } from '@angular/core/testing';

import { beforeEach, describe, expect, it } from 'vitest';
import { GlobalLoaderComponent } from './global-loader.component';

describe('GlobalLoaderComponent', () => {
    let component: GlobalLoaderComponent;
    let fixture: ComponentFixture<GlobalLoaderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [GlobalLoaderComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(GlobalLoaderComponent);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
