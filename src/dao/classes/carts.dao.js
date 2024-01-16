import { cartsModel } from "../models/carts.model.js";

export default class Carts {

    getCartsById = async ({ _id: cid }) => {
        try {
            let result = await cartsModel.findById({ _id: cid }).populate('products.product');
            return result
        }
        catch (error) {
            console.log(error)
            return null
        }
    }

    createCarts = async ({ products: [] }) => {
        try {
            let result = await cartsModel.create({ products: [] })
            return result
        }
        catch (error) {
            console.log(error)
            return null
        }
    }

    addProductToCarts = async ({ _id: cid }) => {
        try {
            let result = await cartsModel.findById({ _id: cid }).populate('products.product');
            return result
        }
        catch (error) {
            console.log(error)
            return null
        }
    }

    getCarts = async () => {
        try {
            let result = await cartsModel.find()
            return result
        }
        catch (error) {
            console.log(error)
            return null
        }
    }

    deleteCarts = async ({ _id: cid }) => {
        try {
            let result = await cartsModel.deleteOne({ _id: cid })
            return result
        }
        catch (error) {
            console.log(error)
            return null
        }
    }

    deleteProductInCarts = async (cid, pid) => {
        try {
            let result = await cartsModel.findOneAndUpdate(
                { _id: cid, 'products.product': pid },
                { $inc: { 'products.$.quantity': -1 } },
                { new: true }
            );

            await cartsModel.findOneAndUpdate(
                { _id: cid, 'products.product': pid, 'products.quantity': { $lte: 0 } },
                { $pull: { 'products': { product: pid } } },
                { new: true }
            );

            return result
        }
        catch (error) {
            console.log(error)
            return null
        }
    }

    updateCarts = async (cid, productsUpdate) => {
        try {
            let result = await cartsModel.findByIdAndUpdate(
                cid,
                {
                    $set: {
                        'products': productsUpdate,
                    },
                },
                { new: true }
            );
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    deleteAllProductsinCarts = async (cid) => {
        try {
            let result = await cartsModel.findById(cid)
            return result
        }
        catch (error) {
            console.log(error)
            return null
        }
    }

    updateQuantityProductsInCarts = async (cid, pid, quantity) => {
        try {
            let cart = await this.getCartsById({ _id: cid });
    
            const existingProductIndex = cart.products.findIndex((p) => p.product.equals(pid));
    
            if (existingProductIndex !== -1) {
                cart.products[existingProductIndex].quantity = quantity;
                await cart.save();
                return cart;
            } else {
                return null;
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    };

}