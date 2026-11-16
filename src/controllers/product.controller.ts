import type { IncomingMessage, ServerResponse } from "http";
import { createProduct, productService } from "../service/product.service";
import type { IProduct } from "../types/products";
import { bodyParser } from "../utils/parsebody";
import { sendResponse } from "../utils/sendResponse";

const productController = async (req: IncomingMessage, res: ServerResponse) => {
    const url = req.url;
    const method = req.method;

    const urlParams = url?.split("/");

    const id =
        urlParams && urlParams[1] === "products" ? Number(urlParams[2]) : null;

    if (url === "/products" && method === "GET") {
        const products = productService();
        try {
            sendResponse(
                res,
                true,
                200,
                "products retrieved succesfully",
                products,
            );
        } catch (error) {
            sendResponse(res, false, 500, `Internal Server error. Error:`);
        }
    } else if (method === "GET" && id !== null) {
        const products = productService();
        const product = products.find((p: IProduct) => p.id === id);

        if (!product) {
            sendResponse(res, false, 404, "Product not found!!");

            return;
        }
        sendResponse(res, true, 200, "Product retrieved succesfully", product);
    } else if (method === "POST" && url === "/products") {
        const body = await bodyParser(req);

        const newProduct = {
            id: Date.now(),
            ...body,
        };

        const products = productService();
        products.push(newProduct);
        createProduct(products);

        sendResponse(
            res,
            true,
            201,
            "Product created succesfully!",
            newProduct,
        );

        return;
    } else if (method === "PUT" && id !== null) {
        const body = await bodyParser(req);
        const products = productService();
        const index = products.findIndex((p: IProduct) => p.id === id);

        if (index < 0) {
            sendResponse(res, false, 404, "Product not found!!");

            return;
        }
        products[index] = {
            id: products[index].id,
            ...body,
        };

        createProduct(products);

        try {
            sendResponse(res, true, 200, "Product updated succesfully!");
        } catch (error) {
            sendResponse(res, false, 500, `Internal Server error. Error:`);
        }

        return;
    } else if (method === "DELETE" && id !== null) {
        const products = productService();
        const product = products.findIndex((p: IProduct) => p.id === id);

        if (product < 0) {
            sendResponse(res, false, 404, "Product not found!!");

            return;
        }
        products.splice(product, 1);

        createProduct(products);

        sendResponse(res, true, 200, "Product deleted succesfully!");
    }
};

export default productController;
