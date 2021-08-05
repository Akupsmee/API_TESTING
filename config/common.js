import supertest from "supertest";
import qa from "./qa"
export default supertest(qa.baseUrl)
