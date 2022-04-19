const app = require("../app");
const request = require("supertest");
const { Collection, Admin } = require("../models/index");
const adminController = require("../controllers/adminController");
const { hashPassword } = require("../helpers/bcrypt");


let access_token;
beforeAll(async () => {

    await request(app)
        .post("/admins/register")
        .send({
            username: "admin",
            email: "admin@email.com",
            password: "password",

        });

    const response = await request(app)
        .post("/admins/login")
        .send({
            email: "admin@email.com",
            password: "password",
        });
    access_token = response.body.access_token;
})

afterAll(async () => {
    await Collection.destroy({
        truncate: true,
        cascade: true,
        restartIdentity: true,
    });
    await Admin.destroy({
        truncate: true,
        cascade: true,
        restartIdentity: true,
    });
});

describe("POST /collections/create - SUCCESS TEST", () => {
    it("should return with status 200", async () => {
        const res = await request(app).post("/collections").send({
            name: "Realism",
            imgUrl: "https://res.cloudinary.com/mahakarya/image/upload/v1650263195/paintings/collection-1_z7bs82.jpg",
            description: "Realism in the arts is generally the attempt to represent subject matter truthfully, without artificiality and avoiding speculative fiction and supernatural elements. The term is often used interchangeably with naturalism, even though these terms are not synonymous.",
            startDate: "2022-04-15T02:00:00.000Z",
            endDate: "2022-04-23T14:00:00.000Z",
            galleryName: "goliath-gallery",
            AdminId: 1
        }).set("access_token", access_token);
        expect(res.status).toBe(201);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toHaveProperty("id", expect.any(Number));
        expect(res.body).toHaveProperty("name", "Realism");
        expect(res.body).toHaveProperty("imgUrl", `https://res.cloudinary.com/mahakarya/image/upload/v1650263195/paintings/collection-1_z7bs82.jpg`);
        expect(res.body).toHaveProperty("description", "Realism in the arts is generally the attempt to represent subject matter truthfully, without artificiality and avoiding speculative fiction and supernatural elements. The term is often used interchangeably with naturalism, even though these terms are not synonymous.");
        expect(res.body).toHaveProperty("startDate", "2022-04-15T02:00:00.000Z");
        expect(res.body).toHaveProperty("endDate", "2022-04-23T14:00:00.000Z");
        expect(res.body).toHaveProperty("galleryName", "goliath-gallery");
        expect(res.body).toHaveProperty("AdminId", 1);
    });
});

describe("POST /collections/create - FAILED TEST", () => {
    it("should return with status 401", async () => {
        const res = await request(app).post("/collections").send({
            name: "Realism",
            imgUrl: "https://res.cloudinary.com/mahakarya/image/upload/v1650263195/paintings/collection-1_z7bs82.jpg",
            description: "Realism in the arts is generally the attempt to represent subject matter truthfully, without artificiality and avoiding speculative fiction and supernatural elements. The term is often used interchangeably with naturalism, even though these terms are not synonymous.",
            startDate: "2022-04-15T02:00:00.000Z",
            endDate: "2022-04-23T14:00:00.000Z",
            galleryName: "goliath-gallery",
            AdminId: 1
        });
        expect(res.status).toBe(401);
        expect(res.body).toHaveProperty("message", "Invalid token");
    });

    it("should return with status 400", async () => {
        const res = await request(app).post("/collections").send({
            name: null,
            imgUrl: "https://res.cloudinary.com/mahakarya/image/upload/v1650263195/paintings/collection-1_z7bs82.jpg",
            description: "Realism in the arts is generally the attempt to represent subject matter truthfully, without artificiality and avoiding speculative fiction and supernatural elements. The term is often used interchangeably with naturalism, even though these terms are not synonymous.",
            startDate: "2022-04-15T02:00:00.000Z",
            endDate: "2022-04-23T14:00:00.000Z",
            galleryName: "goliath-gallery",
            AdminId: 1
        }).set("access_token", access_token);
        expect(res.status).toBe(400);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toHaveProperty("message", "Lot name is required");
    });
})

describe("PUT /collections/:id - SUCCESS TEST", () => {
    it("should return with status 200", async () => {
        const res = await request(app).put("/collections/1").send({
            name: "Realism",
            imgUrl: "https://res.cloudinary.com/mahakarya/image/upload/v1650263195/paintings/collection-1_z7bs82.jpg",
            description: "Realism in the arts is generally the attempt to represent subject matter truthfully, without artificiality and avoiding speculative fiction and supernatural elements. The term is often used interchangeably with naturalism, even though these terms are not synonymous.",
            startDate: "2022-04-15T02:00:00.000Z",
            endDate: "2022-04-23T14:00:00.000Z",
            galleryName: "goliath-gallery",
            AdminId: 1
        }).set("access_token", access_token);
        expect(res.status).toBe(200);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toHaveProperty("message", "Update success")
    });
});

describe("PUT /collections/:id - FAILED TEST", () => {
    it("should return with status 401", async () => {
        const res = await request(app).put("/collections/10").send({
            name: "Realism",
            imgUrl: "https://res.cloudinary.com/mahakarya/image/upload/v1650263195/paintings/collection-1_z7bs82.jpg",
            description: "Realism in the arts is generally the attempt to represent subject matter truthfully, without artificiality and avoiding speculative fiction and supernatural elements. The term is often used interchangeably with naturalism, even though these terms are not synonymous.",
            startDate: "2022-04-15T02:00:00.000Z",
            endDate: "2022-04-23T14:00:00.000Z",
            galleryName: "goliath-gallery",
            AdminId: 1
        });
        expect(res.status).toBe(401);
        expect(res.body).toHaveProperty("message", "Invalid token");
    });

    it("should return with status 404", async () => {
        const res = await request(app).put("/collections/10").send({}).set("access_token", access_token);
        expect(res.status).toBe(404);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toHaveProperty("message", "Data not found")
    });
});

describe("GET /collections/:id - SUCCESS TEST", () => {
    it("should return with status 200", async () => {
        const res = await request(app).get("/collections/1").set("access_token", access_token);
        expect(res.status).toBe(200);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toHaveProperty("id", 1);
        expect(res.body).toHaveProperty("name", "Realism");
        expect(res.body).toHaveProperty("imgUrl", `https://res.cloudinary.com/mahakarya/image/upload/v1650263195/paintings/collection-1_z7bs82.jpg`);
        expect(res.body).toHaveProperty("description", "Realism in the arts is generally the attempt to represent subject matter truthfully, without artificiality and avoiding speculative fiction and supernatural elements. The term is often used interchangeably with naturalism, even though these terms are not synonymous.");
        expect(res.body).toHaveProperty("startDate", "2022-04-15T02:00:00.000Z");
        expect(res.body).toHaveProperty("endDate", "2022-04-23T14:00:00.000Z");
        expect(res.body).toHaveProperty("galleryName", "goliath-gallery");
        expect(res.body).toHaveProperty("AdminId", 1);
    });
});

describe("GET /collections/:id - FAILED TEST", () => {
    it("should return with status 404", async () => {
        const res = await request(app).get("/collections/10");
        expect(res.status).toBe(404);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toHaveProperty("message", "Data not found")
    });
});

describe("GET /collections - SUCCESS TEST", () => {
    it("should return with status 200", async () => {
        const res = await request(app).get("/collections")
        expect(res.status).toBe(200);
        expect(res.body).toEqual(expect.any(Array));
        expect(res.body.length).toEqual(1);
        expect(res.body[0]).toHaveProperty("id", 1);
        expect(res.body[0]).toHaveProperty("name", "Realism");
        expect(res.body[0]).toHaveProperty("imgUrl", `https://res.cloudinary.com/mahakarya/image/upload/v1650263195/paintings/collection-1_z7bs82.jpg`);
        expect(res.body[0]).toHaveProperty("description", "Realism in the arts is generally the attempt to represent subject matter truthfully, without artificiality and avoiding speculative fiction and supernatural elements. The term is often used interchangeably with naturalism, even though these terms are not synonymous.");
        expect(res.body[0]).toHaveProperty("startDate", "2022-04-15T02:00:00.000Z");
        expect(res.body[0]).toHaveProperty("endDate", "2022-04-23T14:00:00.000Z");
        expect(res.body[0]).toHaveProperty("galleryName", "goliath-gallery");
        expect(res.body[0]).toHaveProperty("AdminId", 1);
    });
});


describe("PATCH /collections/:id - SUCCESS TEST", () => {
    it("should return with status 200", async () => {
        const res = await request(app).patch("/collections/1").send({
            galleryName: "goliath-gallery",
        }).set("access_token", access_token);
        expect(res.status).toBe(200);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toHaveProperty("message", "Update success")
    });
});

describe("PATCH /collections/:id - FAILED TEST", () => {
    it("should return with status 401", async () => {
        const res = await request(app).patch("/collections/10").send({
            galleryName: "goliath-gallery",
        });
        expect(res.status).toBe(401);
        expect(res.body).toHaveProperty("message", "Invalid token");
    });

    it("should return with status 404", async () => {
        const res = await request(app).patch("/collections/10").send({}).set("access_token", access_token);
        expect(res.status).toBe(404);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toHaveProperty("message", "Data not found")
    });
});

describe("DELETE /collections/:id - SUCCESS TEST", () => {
    it("should return with status 200", async () => {
        const res = await request(app).delete("/collections/1").set("access_token", access_token);
        expect(res.status).toBe(200);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toHaveProperty("message", "Delete success")
    });
});

describe("DELETE /collections/:id - FAILED TEST", () => {
    it("should return with status 401", async () => {
        const res = await request(app).delete("/collections/1");
        expect(res.status).toBe(401);
        expect(res.body).toHaveProperty("message", "Invalid token");
    });

    it("should return with status 404", async () => {
        const res = await request(app).delete("/collections/10").set("access_token", access_token);
        expect(res.status).toBe(404);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toHaveProperty("message", "Data not found")
    });
});

