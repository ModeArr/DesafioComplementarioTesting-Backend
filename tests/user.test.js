import request from "supertest";
import {CLIENT_URL, API_PREFIX, COOKIE_SECRET} from "../src/config/config.js"

const url = CLIENT_URL
const apiPrefix = API_PREFIX

const api = await request(`${url}${apiPrefix}/user`)

const userLogin = {
    email: "adminCoder@coder.com",
    password: "123"
}

const cookie = await api.post("/login")
                    .send(userLogin)
                    .then((res) => {
                        return res.header['set-cookie']
                    }) 

describe("User Routes", () => {
    describe("Login", () => {
        test("Login succesful ", async() => {
            return api.post(`/login`)
                .send(userLogin)
                .expect('Content-Type', /json/)
                .expect(200)
                .then((res) => {
                    expect(res.body.status).toBe("ok");
                })
        })
    })
    describe("Logout", () => {
        test("Logout user", async() => {
            return api.get("/logout")
                .expect('Content-Type', /json/)
                .expect(200)
                .then((res) => {
                    expect(res.body.status).toBe("ok")
                })
        })
    })

})