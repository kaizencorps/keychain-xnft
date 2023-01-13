import { Svg, Path } from 'react-native-svg';

interface props {
  color?: string,
  height?: number,
  width?: number,
}

export default (props: props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" height={props.height ?? 24} width={props.width ?? 24} viewBox="0 0 24.175 24.175">
    <Path id="information" d="M15.3,10.461H12.879V8.044H15.3m0,12.087H12.879V12.879H15.3M14.087,2A12.087,12.087,0,1,0,26.175,14.087,12.087,12.087,0,0,0,14.087,2Z" transform="translate(-2 -2)" fill={props.color ?? "#73788a"}/>
  </Svg>
)



