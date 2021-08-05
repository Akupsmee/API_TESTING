import supertest from "supertest";
import faker from "faker"

const request = supertest(
    "https://gorest.co.in/public/v1/")

export const createRandomUser = async () => {
    const userData = {
        email: `k-${Math.floor(Math.random() * 1000)}@gmail.com`,
        name: faker.name.firstName(),
        gender: "female",
        status: "inactive"
    }
    const res = await request.post("users").set("Authorization", `Bearer ${process.env.TOKEN}`)
        .send(userData)
    return res.body.data.id


    // console.log(userID);

}