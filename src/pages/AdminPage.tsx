import axios from "axios"
import { ChangeEvent, useEffect, useState } from "react"
import { RecipesListProps } from "../components/Recipes/RecipesList"
import { Modal } from "../components/Modal"
import { Button } from "../components/Button"
import { Input } from "../components/Input"
import { Textaria } from "../components/Textaria"

const initialStateRecipe: RecipesListProps = {
  name: '',
  content: '',
  createdAt: '',
}

const AdminPage = () => {
  const [recipes, setRecipes] = useState<RecipesListProps[]>([])
  const [recipe, setRecipe] = useState<RecipesListProps>(initialStateRecipe)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API}/recipes`)
      .then(({ data }) => setRecipes(data))
  }, [])

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target

    setRecipe(prevState => ({ ...prevState, [name]: value }))
  };

  const handleCreateRecipe = () => {
    axios.post(`${process.env.REACT_APP_API}/recipes`, recipe)
      .then(() => {
        axios.get(`${process.env.REACT_APP_API}/recipes`)
          .then(({ data }) => {
            setRecipe(initialStateRecipe)
            setRecipes(data)
          })
      }).catch(err => console.dir(err))
  }

  const handleOpenDeleteModal = (id: number = 0) => {
    setRecipe(prev => ({ ...prev, id }))
    setShowDeleteModal(true)
  }

  const handleDelete = () => {
    axios.delete(`${process.env.REACT_APP_API}/recipes/${recipe.id}`)
      .then(() => {
        axios.get(`${process.env.REACT_APP_API}/recipes`)
          .then(({ data }) => {
            setRecipes(data)
            setShowDeleteModal(false)
          })
      });
  }


  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-bold text-3xl">Рецепты</h1>
        <Button onClick={() => setShowModal(true)}>
          Добавить рецепт
        </Button>
      </div>
      <Modal isShow={showModal} title="Добавить рецепт" onClose={() => setShowModal(false)} onSave={handleCreateRecipe}>
        <div className="flex flex-col gap-4">
          <Input
            placeholder="Введите Название"
            value={recipe?.name || ''}
            label="Название"
            name="name"
            onChange={handleChange}
            required
          />
          <Input
            placeholder="Укажите дату"
            value={recipe.createdAt.toString()}
            label="Дата"
            name="createdAt"
            type="date"
            onChange={handleChange}
            required
          />
          <Textaria
            label="Описание"
            value={recipe?.content || ''}
            name="content"
            onChange={handleChange}
            required
          />
        </div>
      </Modal>
      <Modal
        isShow={showDeleteModal}
        title="Вы точно хотите удалить запись?"
        hideFooter onClose={() => setShowDeleteModal(false)} onSave={handleCreateRecipe}
      >
        <div className="flex gap-4">

          <Button className="flex-1" color="green" onClick={() => setShowDeleteModal(false)}>Отмена</Button>

          <Button className="flex-1" color="red" onClick={() => handleDelete()}>Удалить</Button>
        </div>
      </Modal>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                #
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Content
              </th>
              <th scope="col" className="px-6 py-3">
                Create at
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {recipes.map(recipe => (
              <tr
                className="odd:bg-white even:bg-gray-50 border-b"
                key={recipe.id}
              >
                <td className="px-6 py-4">{recipe.id}</td>
                <td className="px-6 py-4">{recipe.name}</td>
                <td className="px-6 py-4">{recipe.content}</td>
                <td className="px-6 py-4">{new Date(recipe.createdAt).toLocaleString()}</td>
                <td className="px-6 py-4">
                  <div className="flex items-start gap-2">
                    <button className="px-2 rounded bg-blue-400 text-white text-lg cursor-pointer">
                      &#9998;
                    </button>
                    <button
                      className="px-2 rounded bg-red-400 text-white text-lg cursor-pointer"
                      onClick={() => handleOpenDeleteModal(recipe.id)}
                    >
                      &times;
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;
