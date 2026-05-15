import { useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

const Product = () => {
  const [product, setProduct] = useState<Product[]>([]);

  function addProduct(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const price = formData.get("price") as string;
    const category = formData.get("category") as string;

    if (!(name.trim() && price.trim() && category.trim())) return;

    const newProduct = {
      id: Date.now(),
      name,
      price: Number(price),
      category,
    };

    setProduct((prev) => [...prev, newProduct]);

    event.currentTarget.reset();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <form
        onSubmit={addProduct}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md flex flex-col gap-4"
      >
        <label htmlFor="name" className="font-semibold text-gray-700">
          Nome
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="border-2 border-blue-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500 bg-blue-50 placeholder-gray-400"
          placeholder="Digite o nome"
        />

        <label htmlFor="price" className="font-semibold text-gray-700">
          Preço
        </label>
        <input
          type="text"
          name="price"
          id="price"
          className="border-2 border-blue-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500 bg-blue-50 placeholder-gray-400"
          placeholder="Digite o preço"
        />

        <label htmlFor="category" className="font-semibold text-gray-700">
          Categoria
        </label>
        <select
          name="category"
          id="category"
          className="border-2 border-blue-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500 bg-blue-50 text-gray-700"
        >
          <option value="">Selecione uma categoria</option>
          <option value="Celular">Celular</option>
          <option value="Relógio">Relógio</option>
          <option value="Óculos">Óculos</option>
        </select>
        <button
          type="submit"
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Cadastrar
        </button>
      </form>
      {/* Lista de produtos cadastrados */}
      <div className="ml-8 w-80">
        {product.map((item) => (
          <ul key={item.id} className="mb-4">
            <li className="bg-white rounded shadow p-4 flex flex-col gap-1 border-l-4 border-blue-400">
              <p className="font-bold text-blue-700">{item.name}</p>
              <p className="text-purple-700">R$ {item.price}</p>
              <p className="text-green-700">{item.category}</p>
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default Product;
