import { Svg, Path } from 'react-native-svg';

interface props {
  color: string,
  height?: number,
  width?: number,
}

export default (props: props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" height={props.height ?? 24} width={props.width ?? 24} viewBox="0 0 24 24.169">
    <Path id="progress-alert" d="M15.282,2V4.417a9.668,9.668,0,0,1,0,19.19v2.417A12.084,12.084,0,0,0,15.282,2M12.866,2A11.839,11.839,0,0,0,6.425,4.659L8.153,6.52a9.662,9.662,0,0,1,4.713-2.03V2.073M4.721,6.435A11.854,11.854,0,0,0,2.05,12.876H4.467A9.688,9.688,0,0,1,6.449,8.163L4.721,6.435M2.062,15.293a12.132,12.132,0,0,0,2.671,6.441l1.716-1.728a9.67,9.67,0,0,1-1.97-4.713H2.062M8.1,21.782l-1.68,1.656a12.077,12.077,0,0,0,6.441,2.731V23.752a9.67,9.67,0,0,1-4.713-1.97H8.1m7.178-6.489V8.042H12.866v7.251h2.417m0,4.834V17.71H12.866v2.417Z" transform="translate(-2.05 -2)" fill={props.color} />
  </Svg>
)
