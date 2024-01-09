interface IconProps {
  width: string;
  height: string;
  xlinkHref: string;
}

export const Icon = ({height, width, xlinkHref}: IconProps) => (
  <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height}>
    <use xlinkHref={xlinkHref}></use>
  </svg>
);
