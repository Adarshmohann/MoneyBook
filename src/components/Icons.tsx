import React from 'react';
import Svg, {Path, Circle, Rect} from 'react-native-svg';

interface IconProps {
  color?: string;
  size?: number | string;
  strokeWidth?: number | string;
  opacity?: number | string;
  style?: any;
}

export const Search = ({color = 'black', size = 24, strokeWidth = 2, opacity = 1, style, ...props}: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" opacity={opacity} style={style} {...props}>
    <Circle cx="11" cy="11" r="8" />
    <Path d="m21 21-4.3-4.3" />
  </Svg>
);

export const X = ({color = 'black', size = 24, strokeWidth = 2, opacity = 1, style, ...props}: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" opacity={opacity} style={style} {...props}>
    <Path d="M18 6 6 18" />
    <Path d="m6 6 12 12" />
  </Svg>
);

export const ReceiptText = ({color = 'black', size = 24, strokeWidth = 2, opacity = 1, style, ...props}: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" opacity={opacity} style={style} {...props}>
    <Path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
    <Path d="M14 8H8" />
    <Path d="M16 12H8" />
    <Path d="M13 16H8" />
  </Svg>
);

export const Plus = ({color = 'black', size = 24, strokeWidth = 2, opacity = 1, style, ...props}: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" opacity={opacity} style={style} {...props}>
    <Path d="M5 12h14" />
    <Path d="M12 5v14" />
  </Svg>
);

export const Camera = ({color = 'black', size = 24, strokeWidth = 2, opacity = 1, style, ...props}: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" opacity={opacity} style={style} {...props}>
    <Path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
    <Circle cx="12" cy="13" r="3" />
  </Svg>
);

export const ImageIcon = ({color = 'black', size = 24, strokeWidth = 2, opacity = 1, style, ...props}: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" opacity={opacity} style={style} {...props}>
    <Rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
    <Circle cx="9" cy="9" r="2" />
    <Path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
  </Svg>
);
