import { useEffect, useState } from "react";
import type { ApiResponse, Product } from "./interface/data";

function App() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [count, setCount] = useState(0);
  const [reachedTotal, setReachedTotal] = useState(false);

  useEffect(() => {
    let ignore = false;

    async function fetchProducts() {
      try {
        const response = await fetch(
          `https://dummyjson.com/products?limit=20&skip=${
            count === 0 ? 0 : count * 20
          }`
        );

        const result: ApiResponse = await response.json();
        if (!ignore && result && result.products && result.products.length) {
          setProducts((prev) => {
            const updated = [...prev, ...result.products];

            if (updated.length == result.total) {
              setReachedTotal(true);
            }

            return updated;
          });

          setLoading(false);
        }
      } catch (err) {
        if (!ignore) {
          console.log("something went wrong", err);
          setLoading(false);
        }
      }
    }

    fetchProducts();

    return () => {
      ignore = true;
    };
  }, [count]);

  if (loading && count === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-4 text-lg font-medium text-gray-600">
            Loading products...
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Our Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <p>{product.id}</p>
            <div className="h-48 overflow-hidden">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                {product.title}
              </h2>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-indigo-600">
                  ${product.price}
                </span>
                <span className="text-sm text-gray-500">
                  {product.rating} ★
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                {product.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {!reachedTotal && (
        <div className="mt-10 text-center">
          <button
            onClick={() => setCount(count + 1)}
            className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More Products"}
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
