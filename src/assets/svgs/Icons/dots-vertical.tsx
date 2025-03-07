import { Svg, Path } from 'react-native-svg';

interface props {
  color?: string,
  height?: number,
  width?: number,
}

export default (props: props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" height={props.height ?? 24} width={props.width ?? 24} viewBox="0 0 24 24" >
    <Path d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z" fill={props.color} />
  </Svg>
)

