interface props {
  color: string,
  height?: number,
  width?: number,
  rotation?: number
}

export default (props: props) => (
  <div style={{ transform: `rotate(${props.rotation ?? 0}deg)` }}>
    <svg xmlns="http://www.w3.org/2000/svg" height={props.height ?? 24} width={props.width ?? 24}  viewBox="0 0 24 24">
      <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" fill={props.color}/>
    </svg>
  </div>
)