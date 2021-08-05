import supertest from "supertest";
import { expect } from "chai"

const TOKEN = process.env.TOKEN
const token = "1a2e2b58d10f17fae3e1ec5128874d73924209736ab510149a3b4534dbce18d0"

const request = supertest(
    "https://gorest.co.in/public/v1/")

describe("Users", () => {
    let userID;

    describe("POST", () => {
        it("/users", () => {
            const data = {
                email: `k-${Math.floor(Math.random() * 1000)}@gmail.com`,
                name: "name1",
                gender: "female",
                status: "inactive"
            }
            return request.post("users").set("Authorization", `Bearer ${token}`)
                .send(data)
                .then(res => {
                    expect(res.body.data).to.deep.include(data)
                    userID = res.body.data.id
                    console.log(userID);
                })
        })

    })

    describe("GET", () => {
        it("/users", (done) => {
            request.get(`users?access-token=${TOKEN}`).end((err, res) => {
                expect(res.body.data).to.not.be.empty;
                done();
            })
        })

        it("/users/:id", () => {
            return request.get(`users/${userID}?access-token=${TOKEN}`).then((res) => {
                expect(res.body.data.id).to.be.eq(userID);
            })
        })

        it("/users", () => {
            const url = `users/?name=Somu%20Varman&access-token=${TOKEN}`
            return request.get(url).then((res) => {
                expect(res.body.data).to.not.be.empty;
            })
        })

        it("/users", () => {
            const url = `users/?gender=female&status=active&page=10&access-token=${TOKEN}`
            return request.get(url).then((res) => {
                expect(res.body.data).to.not.be.empty;
                expect(res.body.meta.pagination.page).to.eq(10);
                res.body.data.forEach(data => {
                    expect(data.gender).to.eq("female")
                    expect(data.status).to.eq("active")

                })
            })
        })

    })


    describe("PUT", () => {
        it("/users/:id", () => {
            const data = {
                email: `k-${Math.floor(Math.random() * 1000)}@gmail.com`,
                status: "active"
            }

            return request.put(`users/${userID}`).set("Authorization", `Bearer ${token}`)
                .send(data)
                .then(res => {
                    console.log(res.body);
                    expect(res.body.data).to.deep.includes(data)
                })

        })
    })

    describe("DELETE", () => {

        it("/users/:id", () => {
            return request.delete(`users/${userID}`).set("Authorization", `Bearer ${token}`)
                .then(res => {
                    expect(res.body.data).to.be.eq(undefined)
                })

        })
    })


})






