/* eslint-disable max-len */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import LOGO from '../../site/extras/favicon.svg';
import {arrayMap} from '../common/array';

const PRE_CSS = 'content:url("';
const POST_CSS = '")';

const PRE =
  PRE_CSS +
  `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' stroke-width='4' stroke='white'>`;
const POST = `</svg>` + POST_CSS;

export const LOGO_SVG = PRE_CSS + LOGO + POST_CSS;

export const POSITIONS_SVG = arrayMap(
  [
    [20, 20, 60, 20],
    [60, 20, 20, 60],
    [20, 60, 60, 20],
    [20, 20, 20, 60],
  ],
  ([x, y, w, h]) =>
    PRE +
    `<rect x='20' y='20' width='60' height='60' fill='grey'/><rect x='${x}' y='${y}' width='${w}' height='${h}' fill='white'/>` +
    POST,
);

export const CLOSE_SVG = PRE + `<path d='M20 20l60 60M20 80l60-60' />` + POST;
