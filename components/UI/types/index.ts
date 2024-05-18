export interface StyledLayoutProps {
  // MARGIN
  m?: number;
  mx?: number;
  my?: number;
  mt?: number;
  mr?: number;
  mb?: number;
  ml?: number;

  // PADDING
  p?: number;
  px?: number;
  py?: number;
  pt?: number;
  pr?: number;
  pb?: number;
  pl?: number;

  // BORDER RADIUS
  borderRadius?: number;
  outline?: boolean;

  // WIDTH
  fullWidth?: boolean;
  w?: number | string;

  // BACKGROUND
  background?: string;

  // FLEX
  flex?: number;
  direction?: 'row' | 'column';
  alignItems?: 'center' | 'flex-start' | 'flex-end';
  justifyContent?:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-around';
}
