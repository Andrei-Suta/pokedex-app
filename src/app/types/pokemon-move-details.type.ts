export interface PokemonMoveDetails {
    name: string;
    power: number;
    accuracy: number;
    type: { name: string };
    damage_class: { name: string };
}