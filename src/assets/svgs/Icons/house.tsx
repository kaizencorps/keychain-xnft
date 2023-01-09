interface props {
  color: string,
  height?: number,
  width?: number,
}

export default (props: props) => (
  <svg xmlns="http://www.w3.org/2000/svg" height={props.height ?? 24} width={props.width ?? 24} viewBox="0 0 24 24">
    <path d="M12,3L20,9V21H15V14H9V21H4V9L12,3Z" fill={props.color} />
  </svg>
)


