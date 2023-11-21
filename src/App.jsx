import { useSelector } from "react-redux"
import Posts from "./features/Posts/Posts"

const App = () => {
  const { postTitle } = useSelector(state => state.posts)

  return (
    <div>
      <h2>{postTitle}</h2>
      <Posts />
    </div>
  )
}

export default App