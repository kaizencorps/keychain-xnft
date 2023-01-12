import { Svg, Path } from 'react-native-svg';

interface props {
  color: string,
  height?: number,
  width?: number,
}

export default (props: props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height={props.height ?? 24} width={props.width ?? 24} >
    <Path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" fill={props.color} />
  </Svg>
)

