/*
// src/hooks/useProducts.js
import { useState, useEffect } from 'react';
import { getProducts, addProduct, editProduct, deleteProduct, bulkDeleteProducts } from '../api/products';

const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProducts = async (page, limit, search) => {
        setLoading(true);
        try {
            const data = await getProducts(page, limit, search);
            setProducts(data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const addNewProduct = async (product) => {
        const newProduct = await addProduct(product);
        setProducts((prev) => [...prev, newProduct]);
    };

    const updateProduct = async (id, product) => {
        const updatedProduct = await editProduct(id, product);
        setProducts((prev) => prev.map((p) => (p.id === id ? updatedProduct : p)));
    };

    const removeProduct = async (id) => {
        await deleteProduct(id);
        setProducts((prev) => prev.filter((p) => p.id !== id));
    };

    const removeBulkProducts = async (ids) => {
        await bulkDeleteProducts(ids);
        setProducts((prev) => prev.filter((p) => !ids.includes(p.id)));
    };

    return {
        products,
        loading,
        error,
        fetchProducts,
        addNewProduct,
        updateProduct,
        removeProduct,
        removeBulkProducts,
    };
};

export default useProducts;
*/
