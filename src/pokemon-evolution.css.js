import { css, unsafeCSS } from 'lit-element';
import * as foundations from '@bbva-web-components/bbva-foundations-styles';

export default css`
:host {
  display: block;
  box-sizing: border-box;
  max-width: auto;
}

:host([hidden]), [hidden] {
  display: none !important;
}

*, *::before, *::after {
  box-sizing: inherit;
}

.main {
  display: flex;
  flex-flow: row wrap;
  background-color: #cad5ec;
  text-align: center;
  justify-content: center;
  margin: auto;
  flex-direction: column;
}

.evolutions-button {
  background-color: rgb(69, 115, 207);
  border-radius: 10px;
  margin: auto;
}

.pokemon-title {
  display: flex;
  justify-content: center;
  align-items: center;
}

.pokemon-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.pokemon-card {
  display: flex;
  border: 2px solid rgb(204, 204, 204);
  border-radius: 10px;
  padding: 10px;
  margin: 20px;
  text-align: center;
  background-color: rgb(249, 249, 249);
  flex-flow: wrap;
  flex-direction: column;
  flex-wrap: wrap;
  width: 300px;
  align-content: center;
}
`;
