import './index.css'

const BlogElements = props => {
  const {itemData} = props
  const {title, body, id} = itemData

  return (
    <li className="post-elements-container">
      <div className="post-item-header">
        <p className="post-item-title">{title}</p>
        <p className="post-item-user-id">{id}</p>
      </div>
      <p className="post-item-body">{body}</p>
    </li>
  )
}
export default BlogElements
