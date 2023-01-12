import { Svg, Path } from 'react-native-svg';

interface props {
  color: string,
  height?: number,
  width?: number,
}

export default (props: props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" height={props.height ?? 24} width={props.width ?? 24} viewBox="0 0 24 24">
    <Path id="numeric-3-box" d="M19,13a2,2,0,0,1-2,2,1.989,1.989,0,0,1,2,2v2a2.657,2.657,0,0,1-2.667,2.667H11V19h5.333V16.333H13.667V13.667h2.667V11H11V8.333h5.333A2.657,2.657,0,0,1,19,11m5.333-8H5.667A2.683,2.683,0,0,0,3,5.667V24.333A2.667,2.667,0,0,0,5.667,27H24.333A2.666,2.666,0,0,0,27,24.333V5.667A2.667,2.667,0,0,0,24.333,3Z" transform="translate(-3 -3)" fill={props.color} />
  </Svg>
)



