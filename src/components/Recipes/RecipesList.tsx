import { FC } from "react"
import { Link } from "react-router-dom";

export type RecipesListProps = {
  id?: number;
  name: string;
  img?: string;
  content: string;
  createdAt: Date | string;
}

export const RecipesList: FC<{ list: RecipesListProps[] }> = ({ list }) => {
  return (
    <div className="grid grid-cols-3 gap-6">
      {list.map(recipe => (
        <Link to={`recipe/${recipe.id}`} key={recipe.id} className="border rounded-lg overflow-hidden transition hover:shadow">
          <div className="h-60">
            <img src={recipe.img} alt="img" className="max-h-full w-full object-cover" />
          </div>
          <div className="flex flex-col gap-4 p-3">
            <div className="flex-1">
              <h1 className="font-bold text-xl">{recipe.name}</h1>
              <p className="text-gray-400 text-sm">{recipe.content}</p>
            </div>
            <p className="text-gray-400 text-sm">{new Date(recipe.createdAt).toLocaleString()}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}
