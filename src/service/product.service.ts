import { readFileSync, writeFileSync } from "fs";
import path from "path";
import type { IProduct } from "../types/products";

const filePath = path.join(process.cwd(), "./src/database/db.json");

export const productService = () => {
    // console.log(filePath);
    const result = readFileSync(filePath, { encoding: "utf8" });

    return JSON.parse(result);
};

export const createProduct = (payload: IProduct[]) => {
    writeFileSync(filePath, JSON.stringify(payload));
};
