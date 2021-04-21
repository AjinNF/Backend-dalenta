const route = require('express').Router()
const conect = require('node-json-db')
const conf = require('node-json-db/dist/lib/JsonDBConfig')
const db = new conect.JsonDB(new conf.Config("db.json", true, false, '/'));

route.route('/getallproducts').get(async (req, res, next) => {
    try {
        const data = db.getData('/products')
        res.json({
            response: { data },
            metadata: { message: 'Oke', code: res.statusCode },
        })
    console.log(data);

    } catch (error) {
        next(error)
    }
})

route.route('/getproductbyid/:id').get(async (req, res, next) => {
    try {
        const id = req.params.id
        const data = db.getData('/products')
        const getproductbyid = data.filter((item) => {
            return item.id === id
        })
        res.json({
            response: { getproductbyid },
            metadata: { message: 'Oke', code: res.statusCode },
        })
    } catch (error) {
        next(error)
    }
})

route.route('/deleteproduct/:id').delete(async (req, res, next) => {
    try {
        const id = req.params.id
        db.delete("/products[" + db.getIndex("/products", id, "id") + "]");
        res.json({
            response: "Berhasil",
            metadata: { message: 'Oke', code: res.statusCode },
        })
    } catch (error) {
        next(error)
    }
})

route.route('/updateproduct/:id').post(async (req, res, next) => {
    try {
        const id = req.params.id
        db.delete("/products[" + db.getIndex("/products", id, "id") + "]");
        db.push(`/products[]`, req.body, true);
        res.json({
            response: "Berhasil",
            metadata: { message: 'Oke', code: res.statusCode },
        })
    } catch (error) {
        next(error)
    }
})

route.route('/createproduct').post(async (req, res, next) => {
    try {
        db.push(`/products[]`, req.body, true);
        res.json({
            response: "Berhasil",
            metadata: { message: 'Oke', code: res.statusCode },
        })
    } catch (error) {
        next(error)
    }
})

module.exports = route