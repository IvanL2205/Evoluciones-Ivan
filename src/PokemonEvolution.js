import { LitElement, html } from 'lit-element';
import { getComponentSharedStyles } from '@bbva-web-components/bbva-core-lit-helpers';
import styles from './pokemon-evolution.css.js';
import '@bbva-experience-components/bbva-type-text/bbva-type-text.js';
import '@bbva-experience-components/bbva-button-default/bbva-button-default.js';

/**
 * ![LitElement component](https://img.shields.io/badge/litElement-component-blue.svg)
 *
 * This component ...
 *
 * Example:
 *
 * ```html
 *   <pokemon-evolution></pokemon-evolution>
 * ```
 */
export class PokemonEvolution extends LitElement {

  static get properties() {
    return {
      fullName: { type: String },
      evolutions: { type: String },
    };
  }

  constructor() {
    super()
    this.evolutions = [];
    this.getBulbasaurEvolutions();
  }

  static get styles() {
    return [
      styles,
      getComponentSharedStyles('pokemon-evolution-shared-styles'),
    ];
  }


  async getBulbasaurEvolutions() {
    try {
      const bulbasaurResponse = await fetch('https://pokeapi.co/api/v2/pokemon/1/');
      const bulbasaurData = await bulbasaurResponse.json();

      const speciesResponse = await fetch(bulbasaurData.species.url);
      const speciesData = await speciesResponse.json();
      const evolutionChainUrl = speciesData.evolution_chain.url;

      const evolutionResponse = await fetch(evolutionChainUrl);
      const evolutionData = await evolutionResponse.json();

      let currentEvolution = evolutionData.chain;

      while (currentEvolution) {
        const evolutionName = currentEvolution.species.name;
        const evolutionDetails = await this.getPokemonDetails(evolutionName);

        this.evolutions = [
          ...this.evolutions,
          {
            name: evolutionName,
            image: evolutionDetails.image,
            types: evolutionDetails.types
          }
        ];

        currentEvolution = currentEvolution.evolves_to[0];
      }

      this.evolutions = this.evolutions.slice(1); // Remove Bulbasaur itself
    } catch (error) {
      console.error('Error al obtener las evoluciones de Bulbasaur:', error);
    }
  }

  async getPokemonDetails(namePokemon) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${namePokemon}/`);
      const data = await response.json();
      const image = data.sprites.front_default;
      const types = data.types.map(typeInfo => typeInfo.type.name);

      return { image, types };
    } catch (error) {
      console.error(`Error al obtener los detalles de ${name}:`, error);
      return { image: null, types: [] };
    }
  }


  render() {
    return html`
        <div class="main">
            <bbva-type-text class="pokemon-title" text="Evoluciones"></bbva-type-text>    
            <bbva-button-default class="evolutions-button" active=""  @click=${this.gotoPokemon}>
                Back To Pokemon List
            </bbva-button-default> 
            ${this._listPokemonTpl}             
        </div>
    `;
  }

  get _listPokemonTpl() {
    return html`
      ${this.evolutions ? this.evolutions.map(pokemon => html`
        <div class="pokemon-container">
          <div class="pokemon-card">
            <img class="pokemon-image" slot="media" src="${pokemon.image}" alt="${pokemon.name}">
            <bbva-type-text class="pokemon-name" slot="title" text="${pokemon.name}"></bbva-type-text>
            <div class="pokemon-type" slot="details">
              ${pokemon.types.map(typeInfo => html`<span>${typeInfo.type}</span>`)}
            </div>
          </div>
        </div>
      `) : ''}
    </div>
    `;
  }

  gotoPokemon() {
    this.navigate('pokemon-list');
  }

}

