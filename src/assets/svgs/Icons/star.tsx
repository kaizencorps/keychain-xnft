interface props {
  color: string,
  height?: number,
  width?: number,
}

export default (props: props) => (
  <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" height={props.height ?? 24} width={props.width ?? 24} viewBox="0 0 24 24">
    <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" fill={props.color} />
  </svg>
)



