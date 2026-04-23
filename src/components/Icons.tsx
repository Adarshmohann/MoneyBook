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

export const Database = ({color = 'black', size = 24, strokeWidth = 2, opacity = 1, style, ...props}: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" opacity={opacity} style={style} {...props}>
    <Path d="M3 5V19C3 20.66 7.03 22 12 22C16.97 22 21 20.66 21 19V5" />
    <Path d="M3 5C3 6.66 7.03 8 12 8C16.97 8 21 6.66 21 5C21 3.34 16.97 2 12 2C7.03 2 3 3.34 3 5Z" />
    <Path d="M21 12C21 13.66 16.97 15 12 15C7.03 15 3 13.66 3 12" />
  </Svg>
);

export const Trash2 = ({color = 'black', size = 24, strokeWidth = 2, opacity = 1, style, ...props}: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" opacity={opacity} style={style} {...props}>
    <Path d="M3 6h18" />
    <Path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
    <Path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    <Path d="M10 11v6" />
    <Path d="M14 11v6" />
  </Svg>
);

export const Edit2 = ({color = 'black', size = 24, strokeWidth = 2, opacity = 1, style, ...props}: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" opacity={opacity} style={style} {...props}>
    <Path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    <Path d="m15 5 4 4" />
  </Svg>
);

export const ArrowLeft = ({color = 'black', size = 24, strokeWidth = 2, opacity = 1, style, ...props}: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" opacity={opacity} style={style} {...props}>
    <Path d="m12 19-7-7 7-7" />
    <Path d="M19 12H5" />
  </Svg>
);

export const ChevronLeft = ({color = 'black', size = 24, strokeWidth = 2, opacity = 1, style, ...props}: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" opacity={opacity} style={style} {...props}>
    <Path d="m15 18-6-6 6-6" />
  </Svg>
);
