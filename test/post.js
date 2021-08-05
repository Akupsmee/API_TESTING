import supertest from "supertest";
import { expect } from "chai"

const request = supertest(
    "https://gorest.co.in/public/v1/")

describe("User Posts", () => {
    let postID;
    let userID;

    it("POST /posts", async () => {

        const userData = {
            email: `k-${Math.floor(Math.random() * 1000)}@gmail.com`,
            name: "name1",
            gender: "female",
            status: "inactive"
        }
        return request.post("users").set("Authorization", `Bearer ${process.env.TOKEN}`)
            .send(userData)
            .then(async (res) => {
                expect(res.body.data).to.deep.include(userData)
                userID = res.body.data.id
                // console.log(userID);

                const data = {
                    user_id: userID,
                    title: "My post body",
                    body: "This is good"
                }

                const postResponse = await request.post("posts").set("Authorization", `Bearer ${process.env.TOKEN}`).send(data)

                // console.log(postResponse.body);

                expect(postResponse.body.data).to.deep.include(data)
                postID = postResponse.body.data.id
            })
    })

    it("GET /posts/:id", async () => {
        // console.log(postID);
        const res = await request.get(`posts/${postID}`).set("Authorization", `Bearer ${process.env.TOKEN}`)
        // console.log(res.status);
        expect(res.status).to.be.eq(200)
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