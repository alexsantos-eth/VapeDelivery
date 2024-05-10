import {createFont} from 'tamagui';

import {config} from '@tamagui/config';

const MontserratFace = {
  normal: {normal: 'Montserrat-Regular'},
  bold: {normal: 'Montserrat-Bold'},
  100: {normal: 'Montserrat-Regular'},
  200: {normal: 'Montserrat-Regular'},
  300: {normal: 'Montserrat-Regular'},
  400: {normal: 'Montserrat-Regular'},
  500: {normal: 'Montserrat-Regular'},
  600: {normal: 'Montserrat-Regular'},
  700: {normal: 'Montserrat-Bold'},
  800: {normal: 'Montserrat-Bold'},
  900: {normal: 'Montserrat-Bold'},
};

const MonumentFace = {
  normal: {normal: 'MonumentExtended'},
  bold: {normal: 'MonumentExtended'},
  100: {normal: 'MonumentExtended'},
  200: {normal: 'MonumentExtended'},
  300: {normal: 'MonumentExtended'},
  400: {normal: 'MonumentExtended'},
  500: {normal: 'MonumentExtended'},
  600: {normal: 'MonumentExtended'},
  700: {normal: 'MonumentExtended'},
  800: {normal: 'MonumentExtended'},
  900: {normal: 'MonumentExtended'},
};

export const headingFont = createFont({
  size: config.fonts.heading.size,
  lineHeight: config.fonts.heading.lineHeight,
  weight: config.fonts.heading.weight,
  letterSpacing: config.fonts.heading.letterSpacing,
  face: MontserratFace,
});

export const bodyFont = createFont({
  size: config.fonts.body.size,
  lineHeight: config.fonts.body.lineHeight,
  weight: config.fonts.body.weight,
  letterSpacing: config.fonts.body.letterSpacing,
  face: MonumentFace,
});
