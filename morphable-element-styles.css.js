import {css} from 'lit';

export const styles = css`
  :host {
    --spacing: 8px;

    display: flex;
    flex-direction: column;
    align-items: start;
    gap: var(--spacing);
    padding: var(--spacing);
    border-radius: calc(var(--spacing) / 2);
    border: 1px dashed rgb(204, 204, 204);
    margin-bottom: 1rem;
    background-color: rgba(204, 204, 204, 0.2);
  }

  :host([hidden]),
  [hidden] {
    display: none !important;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  button {
    vertical-align: middle;
    padding: 0.4em;
  }
`;
