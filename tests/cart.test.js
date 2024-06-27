import request from "supertest";
import {CLIENT_URL, API_PREFIX, COOKIE_SECRET} from "../src/config/config.js"

const url = CLIENT_URL
const apiPrefix = API_PREFIX

const api = await request(`${url}${apiPrefix}/carts`)
const login = request(`${url}${apiPrefix}/user`)

const userLogin = {
    email: "adminCoder@coder.com",
    password: "123"
}

const cart = "664df22a15e0c14a5e07daca"
const product = "65cea827cf91d8472f0bfbce"

const cookie = await login.post("/login")
                    .send(userLogin)
                    .then((res) => {
                        return res.header['set-cookie']
                    }) 

describe("Cart Routes", () => {
    describe("Get Cart Products /", () => {
        test("should respond with a 200 status code", async() => {
            return api.get(`/${cart}`)
                .expect('Content-Type', /json/)
                .expect(200)
                .then((res) => {
                    expect(res.statusCode).toBe(200);
                })
        })
    })
    describe("Add product to Cart /", () => {
        test("Add product to cart", async() => {
            return api.post(`/${cart}/product/${product}`)
                .set("Cookie", cookie)
                .expect('Content-Type', /json/)
                .expect(200)
                .then((res) => {
                    expect(res.body._id).toBe(cart)
                    expect(res.body.products).toEqual(
                        expect.arrayContaining([
                            expect.objectContaining({
                                "product": product
                            })
                        ])
                    )
                })
        })
    })

    describe("Add quantity to product", () => {
        test("Edit quantity of the product", async() => {
            return api.put(`/${cart}/product/${product}`)
                .set("Cookie", cookie)
                .send({
                    quantity: 1
                })
                .expect('Content-Type', /json/)
                .expect(200)
                .then((res) => {
                    expect(res.body.products).toEqual(
                        expect.arrayContaining([
                            expect.objectContaining({
                                "product": product,
                                "quantity": 1
                            })
                        ])
                    )
                })
        })
    })

    describe("Delete product from Cart /", () => {
        test("Delete product from cart", async() => {
            return api.delete(`/${cart}/product/${product}`)
                .set("Cookie", cookie)
                .expect('Content-Type', /json/)
                .expect(200)
                .then((res) => {
                    expect(res.body.acknowledged).toBe(true)
                })
        })
    })

})