interface IconProps {
  width: string;
  height: string;
  xlinkHref: string;
}

export const Icon = ({height, width, xlinkHref}: IconProps) => (
  <svg data-testid='icon' viewBox={`0 0 ${width} ${height}`} width={width} height={height}>
    <use data-testid='use' xlinkHref={xlinkHref}></use>
  </svg>
);
