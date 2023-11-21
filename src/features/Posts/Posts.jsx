import { useSelector, useDispatch } from "react-redux"
import { updateTitle, updateBody, fetchPosts, addPosts } from "./PostsSlice"

const Posts = () => {
  const { postTitle, postBody, listOfPosts, isLoading, isSending } = useSelector(state => state.posts)
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()

    dispatch(addPosts({ title: postTitle, body: postBody}))
  }

  return (
    <>
      <h1>Posts</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <label>
          <input type="text" value={postTitle} onChange={(event) => dispatch(updateTitle(event.target.value))} />
        </label>
        <label>
          <textarea value={postBody} cols={30} rows={5} onChange={(event) => dispatch(updateBody(event.target.value))}></textarea>
        </label>
        <label>
          {isSending ? (
            <button disabled style={{ backgroundColor: 'grey'}}>SENDING...</button>
          ): (
            <button type="submit">Add Post</button>
          )}
        </label>
      </form>

      <div>
        <h2>Preview</h2>
        <p>Post Title: {postTitle}</p>
        <p>Post Body: {postBody}</p>
      </div>

      <div>
        <h2>List of Posts</h2>
        <button onClick={() => dispatch(fetchPosts())}>Fetch Posts</button>
        {isLoading ? (
          <div><strong>Loading...</strong></div>
        ) : (
          <ul>
            {listOfPosts.map((post, index) => (
              <li key={index}>{post.title} - {post.body}</li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}

export default Posts