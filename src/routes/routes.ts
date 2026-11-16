import type { IncomingMessage, ServerResponse } from "http";
import productController from "../controllers/product.controller";

const routerHandler = (req: IncomingMessage, res: ServerResponse) => {
    const url = req.url;
    const method = req.method;

    if (url === "/" && method === "GET") {
        // console.log("first");
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Root route" }));
    } else if (url?.startsWith("/products")) {
        productController(req, res);
    } else {
        // console.log("This route is not defined");
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "This route is not found" }));
    }
};

export default routerHandler;
