import React, { createContext, useState, useContext } from "react";
const DataContext = createContext();
export const useDataContext = () => useContext(DataContext);
export const DataProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const addProduct = (productData) => {
    setProducts((prevProducts) => [...prevProducts, productData]);
  };
  const updateProduct = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };
  const deleteProduct = (id) => {
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
  };
  const setProductToEdit = (product) => {
    setEditingProduct(product);
  };
  return (
    <DataContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        editingProduct,
        setProductToEdit,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
