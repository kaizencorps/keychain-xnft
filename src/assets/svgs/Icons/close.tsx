import { Svg, Path } from 'react-native-svg';

interface props {
  color: string,
  height?: number,
  width?: number,
}

export default (props: props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" height={props.height ?? 24} width={props.width ?? 24} viewBox="0 0 40 40">
    <Path id="close-circle-outline_1_" data-name="close-circle-outline (1)" d="M22,38A16,16,0,1,1,38,22,16.021,16.021,0,0,1,22,38M22,2A20,20,0,1,0,42,22,19.982,19.982,0,0,0,22,2m5.18,12L22,19.18,16.82,14,14,16.82,19.18,22,14,27.18,16.82,30,22,24.82,27.18,30,30,27.18,24.82,22,30,16.82Z" transform="translate(-2 -2)" fill={props.color} />
  </Svg>
)



