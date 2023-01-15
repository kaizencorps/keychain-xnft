import { Svg, Path } from 'react-native-svg';

interface props {
  color: string,
  height?: number,
  width?: number,
}

export default (props: props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={props.width ?? 26} height={props.height ?? 28} viewBox="0 0 25.521 28.356">
    <Path id="logout" d="M21.432,23.267V19.014H11.507V13.343h9.925V9.089l7.089,7.089-7.089,7.089M18.6,2a2.836,2.836,0,0,1,2.836,2.836V7.671H18.6V4.836H5.836V27.521H18.6V24.685h2.836v2.836A2.836,2.836,0,0,1,18.6,30.356H5.836A2.836,2.836,0,0,1,3,27.521V4.836A2.836,2.836,0,0,1,5.836,2Z" transform="translate(-3 -2)" fill={props.color} />
  </Svg>
)
