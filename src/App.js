import React, { useState, useEffect } from "react";
import "./App.scss";
import { getProducts } from "./util/fetchData";
import LoadingSpinner from "./util/loadingSpinner";
import Navbar from "./Components/Navbar/navbar";
import Plp from "./Components/PLP/plp"

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    getProducts()
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setIsLoading(false);
      })
      .catch(error => console.log(error))
  }, []);

  useEffect(() => {
    if(!isLoading && !products)
    getProducts();
  }, []);

  return (
    <div className="App">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />
      <Navbar />

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <section>
          <Plp list={products} />
        </section>
      )}
    </div>
  );
}

export default App;
