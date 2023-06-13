import { ProductRepo } from "../../../index";

export class ProductController {
    static async addNewProduct(req: any, res: any) {
        try {
            const productSearch = await ProductRepo.findOneBy({ name: req.body.name });
            if (productSearch) {
                return res.status(500).json({
                    mesage: "Sản phẩm đã tồn tại"
                })
            }
            const { name, image, author, price } = req.body;
            const productData = {
                name: name,
                image: image,
                author: author,
                price: price
            }
            let product = await ProductRepo.save(productData);
            if (product) {
                return res.status(200).json({
                    message: "Tạo sản phẩm thành công!",
                    product: productData
                    });
            }
        } catch(err) {
            res.status(500).json({
                message: err.message
            })
        }
    }

    static async updateProductByID(req:any, res:any) {
        try {
            const productSearch = await ProductRepo.findOneBy({ id: req.params.id });
            if (!productSearch) {
                return res.status(500).json({
                    mesage: "Sản phẩm không tồn tại"
                });
            };
            await ProductRepo.update({ id: req.params.id }, req.body);
            return res.status(200).json({
                message: "Cập nhật sản phẩm thành công!",
                });

        } catch(err) {
            res.status(500).json({
                message: err.message
            });
        };
    }

    static async deleteProductByID(req:any, res: any) {
        try {
            const productSearch = await ProductRepo.findOneBy({ id: req.params.id });
            if (!productSearch) {
                return res.status(500).json({
                    mesage: "Sản phẩm không tồn tại"
                });
            };
            await ProductRepo.delete({ id: req.params.id });
            return res.status(200).json({
                message: "Xóa sản phẩm thành công!",
                });

        } catch(err) {
            res.status(500).json({
                message: err.mesage
            });
        };
    }

    static async getAllProduct(req: any, res: any) {
        try {
            const products = await ProductRepo.find();
            if (products) {
                return res.status(200).json({
                    message: "Thành công!",
                    products: products
                });
            };
        } catch(err) {
            res.status(500).json({
                message: err.mesage
            });
        };
    }

    static async getDetailProduct(req:any, res: any) {
        try {
            const productSearch = await ProductRepo.findOneBy({ id: req.params.id }).catch(err => console.log(err));
            if (!productSearch) {
                return res.status(500).json({
                    mesage: "Sản phẩm không tồn tại"
                });
            }
            return res.status(200).json({
                message: "Thành công!", productSearch
            });
        } catch(err) {
            res.status(500).json({
                message: err.mesage
            });
        };
    }
}