import { productsModel } from "../models/products.model.js";

export default class Products {

    getProducts = async (query, options) => {
        try {
            let result = await productsModel.paginate(query, options)
            return result;
        }
        catch (error) {
            console.log(error)
            return null;
        }
    }

    getProductsById = async (pid) => {

        try {
            let result = await productsModel.findById(pid)
            return result;
        }

        catch (error) {
            console.log(error)
            return null
        }
    }

    createProducts = async (title, description, price, thumbnail, code, stock, category) => {

        try {
            let result = await productsModel.create({
                title,
                description,
                price,
                thumbnail,
                code,
                stock,
                category
            })
            return result
        }
        catch (error) {
            console.log(error)
            return null
        }
    }

    updateProducts = async ({ _id: pid }, productReplace) => {
        try {
            let result = await productsModel.updateOne({ _id: pid }, productReplace)
            return result;
        }
        catch (error) {
            console.log(error)
            return null
        }
    }

    deleteProducts = async ({ _id: pid }) => {

        try {
            let result = await productsModel.deleteOne({ _id: pid })
            return result;
        }

        catch (error) {
            console.log(error)
            return null
        }
    }


}