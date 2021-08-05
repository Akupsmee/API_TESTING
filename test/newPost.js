import request from "../config/common";
import { expect } from "chai"
import { createRandomUser } from "../helper/user.helper";
// import faker from "faker"
const faker = require ("faker")


describe("User Posts", () => {
    let postID, userID;

    before(async () => {
      userID = await createRandomUser()
    })

    it("POST /posts", async () => {
        const data = {
            user_id: userID,
            title: faker.lorem.sentence(),
            body: faker.lorem.paragraph()
        }
        const postResponse = await request.post("posts").set("Authorization", `Bearer ${process.env.TOKEN}`).send(data)
        // console.log(postResponse.body);

        expect(postResponse.body.data).to.deep.include(data)
        postID = postResponse.body.data.id
    })

    it("GET /posts/:id", async () => {
        // console.log(postID);
        const res = await request.get(`posts/${postID}`).set("Authorization", `Bearer ${process.env.TOKEN}`)
        // console.log(res.status);
        expect(res.status).to.be.eq(200)
    })


    describe("Negative Tests ", ()=>{
        it("401 Authentication error user /posts", async()=>{
            const data = {
                user_id: userID,
                title: "My post body",
                body: "This is good"
            }
            // fake token sent intentionally
            const postResponse = await request.post("posts").set("Authorization", `Bearer ${1}`).send(data)
            expect(postResponse.status).to.be.eq(401)
            expect(postResponse.body.data.message).to.eq("Authentication failed")
    
            // expect(postResponse.body.data).to.deep.include(data)
            
        })

        it("422 Validation failed /posts", async()=>{
            const data = {
                user_id: userID,
                title: "My post body",
                // body not sent purposely
            }
            const postResponse = await request.post("posts").set("Authorization", `Bearer ${process.env.TOKEN}`).send(data)
            
            console.log(postResponse.body);            
            expect(postResponse.status).to.be.eq(422)
            expect(postResponse.body.data[0].message).to.eq("can't be blank")
    
            // expect(postResponse.body.data).to.deep.include(data)
            
        })
    })
})






// var randomNumber = [];

// for (var i = 0; i < 16; i++) {
//     var number = Math.floor(Math.random() * 4);
//     var genNumber = randomNumber.indexOf(number);
//     if (genNumber === -1) {
//         randomNumber.push(number);
//     }
// }