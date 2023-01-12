import { Svg, Path, G, Rect } from 'react-native-svg';

interface props {
  color: string,
  height?: number,
  width?: number,
}

export default (props: props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" height={props.height ?? 24} width={props.width ?? 24} viewBox="0 0 24 24">
    <G id="Group_2619" data-name="Group 2619" transform="translate(-215 -442)">
      <G id="Group_2619-2" data-name="Group 2619" transform="translate(-1282 -100)">
        <Rect id="Rectangle_2522" data-name="Rectangle 2522" height={props.height ?? 24} width={props.width ?? 24} rx="2" transform="translate(1497 542)" fill={props.color} />
      </G>
      <Path id="plus" d="M15,10.714H10.714V15H9.286V10.714H5V9.286H9.286V5h1.429V9.286H15Z" transform="translate(217 444)" fill="#fff"/>
    </G>
  </Svg>
)



