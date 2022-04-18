const app = require("../app");
const request = require("supertest");
const { Admin, Lot, Collection, User } = require("../models");

beforeAll(async () => {
  await Admin.create({
    username: "admintest",
    email: "admintest@email.com",
    password: "12345",
  });

  await User.bulkCreate(
    {
      username: "usertestlot1",
      email: "usertestlot1@email.com",
      password: "password",
      ktp: "1111111222111111",
      phoneNumber: "08123456789",
      address: "usertestlot1 address",
      role: "seller",
    },
    {
      username: "usertestlot2",
      email: "usertestlot2@email.com",
      password: "password",
      ktp: "2222222111222222",
      phoneNumber: "08123456789",
      address: "usertestlot2 address",
      role: "seller",
    }
  );

  await Collection.bulkCreate(
    {
      name: "Realism",
      imgUrl: "https://res.cloudinary.com/mahakarya/image/upload/v1650263195/paintings/collection-1_z7bs82.jpg",
      description: "Realism in the arts is generally the attempt to represent subject matter truthfully, without artificiality and avoiding speculative fiction and supernatural elements. The term is often used interchangeably with naturalism, even though these terms are not synonymous.",
      startDate: "2022-04-15T09:00:00+0700",
      endDate: "2022-04-23T21:00:00+0700",
      galleryName: "goliath-gallery",
      AdminId: 1,
    },
    {
      name: "Surrealism",
      imgUrl: "https://res.cloudinary.com/mahakarya/image/upload/v1650263195/paintings/collection-2_m4oqre.jpg",
      description: "Surrealism is a cultural movement that developed in Europe in the aftermath of World War I in which artists depicted unnerving, illogical scenes and developed techniques to allow the unconscious mind to express itself.",
      startDate: "2022-05-01T09:00:00+0700",
      endDate: "2022-05-15T21:00:00+0700",
      galleryName: "david-gallery",
      AdminId: 1,
    }
  );

  await Lot.bulkCreate(
    {
      name: "La familia de Carlos IV",
      description: "Aparecen Goya, los infantes Carlos María Isidro, Francisco de Paula, Carlota Joaquina, María Josefa, María Luisa, Gabriel Antonio, Carlos Luis. También se observa a Luis de Etruria, esposo de María Luisa. Ésta carga en brazos a su hijo Carlos Luis. Otras figuras son los reyes Carlos IV y María Luisa de Parma, el príncipe Fernando y su esposa María Antonieta.",
      width: 336,
      height: 280,
      startingBid: 10000000,
      SellerId: 1,
      CollectionId: 1,
      primaryImage: "https://res.cloudinary.com/mahakarya/image/upload/v1650263196/paintings/1-1-1_f8ueab.jpg",
      secondImage: "https://res.cloudinary.com/mahakarya/image/upload/v1650263199/paintings/1-1-2_z4yy3a.jpg",
      thirdImage: "https://res.cloudinary.com/mahakarya/image/upload/v1650263185/paintings/1-1-4_bpwjsz.jpg",
      artistName: "Francisco de Goya",
      lotNumber: 1,
    },
    {
      name: "Butcher's Shop",
      description: "Annibale Carracci - Butcher's Shop (1560-1609)",
      width: 271,
      height: 190,
      startingBid: 15000000,
      SellerId: 2,
      CollectionId: 2,
      primaryImage: "https://res.cloudinary.com/mahakarya/image/upload/v1650263186/paintings/1-2-1_pavtui.jpg",
      secondImage: "https://res.cloudinary.com/mahakarya/image/upload/v1650263186/paintings/1-2-2_jax2g6.jpg",
      thirdImage: "https://res.cloudinary.com/mahakarya/image/upload/v1650263185/paintings/1-2-3_mfc4sa.jpg",
      artistName: "Annibale Carracci",
      lotNumber: 1,
    }
  );
});

afterAll(async () => {
  await Lot.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
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

describe("GET /lots - SUCCESS TEST FETCH ALL LOTS", () => {
  it("should return with status 200", async () => {
    const res = await request(app).get("/lots");

    console.log(res.body);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data", expect.any(Array));
  });
});
