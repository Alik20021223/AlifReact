import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { RecipesListProps } from '../components/Recipes/RecipesList'

const RecipteShowPage = () => {
  const [recipe, setrecipe] = useState<RecipesListProps>()
  const { id } = useParams()

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API}/recipes/${id}`)
      .then(({ data }) => {
        setrecipe(data)
      })
  }, [])

  return (
    <div className="max-w-4xl mx-auto py-20">
      <div className="mb-5">
        <img src={recipe?.img} alt="img" className="w-full object-contain" />
      </div>
      <h1 className="font-bold text-4xl mb-4">{recipe?.name}</h1>
      <div className="text-gray-400 mb-6">
        {new Date(recipe?.createdAt || '').toLocaleString()}
      </div>
      <p>
        {recipe?.content}
      </p>
    </div>
  )
}

export default RecipteShowPage