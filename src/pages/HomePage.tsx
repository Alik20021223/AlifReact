import axios from 'axios';
import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPost } from '../store/slices/postSlice'
import { RecipesList, RecipesListProps } from '../components/Recipes/RecipesList';

const NEW_API_URL = "https://fe12d12ede906215.mokky.dev";

const HomePage: FC = () => {
  const dispatch = useDispatch()
  const posts = useSelector((state: { post: RecipesListProps[] }) => state.post);

  useEffect(() => {
    axios.get(`${NEW_API_URL}/recipes`)
      .then(({ data }) => dispatch(setPost(data)))
  }, [])

  return (
    <div className="container mx-auto">
      <RecipesList list={posts} />
    </div>
  )
}

export default HomePage