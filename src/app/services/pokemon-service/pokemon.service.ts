import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

interface PokeApiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: any[];
}

@Injectable({ providedIn: 'root' })
export class PokemonService {
    private http = inject(HttpClient);
    private baseUrl = 'https://pokeapi.co/api/v2/pokemon';

    getPokemon(url: string = this.baseUrl): Observable<PokeApiResponse> {
        return this.http.get<PokeApiResponse>(url);
    }
}