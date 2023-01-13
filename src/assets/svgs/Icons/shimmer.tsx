import { Svg, Path } from 'react-native-svg';

interface props {
  color?: string,
  height?: number,
  width?: number,
}

export default (props: props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={props.width ?? 76} height={props.height ?? 84} viewBox="0 0 76 84">
    <Path id="shimmer" d="M36.4,35.4,30,57,23.6,35.4,2,29l21.6-6.4L30,1l6.4,21.6L58,29,36.4,35.4M62,53.8,78,45,69.2,61,78,77,62,68.2,46,77l8.8-16L46,45l16,8.8M34,61,27.2,73,34,85,22,78.2,10,85l6.8-12L10,61l12,6.8L34,61" transform="translate(-2 -1)" fill={props.color ?? "#ffd651"} />
  </Svg>
)



