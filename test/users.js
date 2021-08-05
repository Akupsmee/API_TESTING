import supertest from "supertest";
import { expect } from "chai"
require("dotenv").config()

const request = supertest(
    "https://gorest.co.in/public/v1/")

describe("Users", () => {
    it("GET /users", (done) => {
        request.get(`users?access-token=${process.env.TOKEN}`).end((err, res) => {
            expect(res.body.data).to.not.be.empty;
            done();
        })
    })

    it("GET /users/:id", () => {
       return request.get(`users/24?access-token=${process.env.TOKEN}`).then((res) => {
            expect(res.body.data.id).to.be.eq(24);
       })    
    })

    it("GET /users", () => {
        const url = `users/?name=Somu%20Varman&access-token=${process.env.TOKEN}`
       return request.get(url).then((res) => {
            expect(res.body.data).to.not.be.empty;
       })    
    })

    it("GET /users", () => {
        const url = `users/?gender=female&status=active&page=10&access-token=${process.env.TOKEN}`
       return request.get(url).then((res) => {
            expect(res.body.data).to.not.be.empty;
            expect(res.body.meta.pagination.page).to.eq(10);
            res.body.data.forEach(data=>{
                expect(data.gender).to.eq("female")
                expect(data.status).to.eq("active")
                
            })
       })    
    })
})


describe("Users", () => {
    it("POST /users", () => {
        
        const data = {
            email : `k-${Math.floor(Math.random()*1000)}@gmail.com`,
            name: "name1",
            gender: "female",
            status : "inactive"
        }

       return request.post("users").set("Authorization", `Bearer ${process.env.TOKEN}`)
       .send(data)
       .then(res=> {
           expect(res.body.data).to.deep.includes(data)
        })               
    })



    it("PUT /users/:id", () => {
        
        const data = {
            email : `k-${Math.floor(Math.random()*1000)}@gmail.com`,
            status : "active"
        }

       return request.put("users/1560").set("Authorization", `Bearer ${process.env.TOKEN}`)
       .send(data)
       .then(res=> {
           console.log(res.body);
           expect(res.body.data).to.deep.includes(data)
        })    
        
    })

    it("DELETE /users/:id", () => {
        
       return request.delete("users/23").set("Authorization", `Bearer ${process.env.TOKEN}`)
       .then(res=> {
           expect(res.body.data).to.be.eq(undefined)
        })    
        
    })
})