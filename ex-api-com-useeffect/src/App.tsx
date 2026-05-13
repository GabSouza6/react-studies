import { useEffect, useState } from "react";
import "./App.css";

interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  image: string;
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data)
      } catch (error) {
        console.error("Erro ao buscar dados da Api:", error)
      }
      finally{
        setLoading(false)
      }
    };

    fetchProducts();
  }, []);

   if (loading) {
        return <p>Carregando produtos...</p>
    }


  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {products.map((product) => {
        return (
          <div className="border rounded-lg shadow">
            <img
              className="w-full h-52 object-contain"
              src={product.image}
              alt={product.title}
            />
            <h2 className="font-bold mt-2">{product.title}</h2>
            <p className="text-green-600 font-semibold">R$ {product.price}</p>
            <p className="text-sm text-gray-600">{product.description}</p>
          </div>
        );
      })}
    </div>
  );
}

export default App;
