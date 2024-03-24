import supertest from "supertest";
import createServer from "../server";
import dotenv from "dotenv";
import datasource from "../config/sql/connection";
import { Express } from "express";

dotenv.config();

let app: Express | undefined;

let token = "";

describe("Auction", () => {
  beforeAll(() => {
    app = createServer(401, datasource);
  });

  describe("get auction bids route", () => {
    describe("given the token is not given in request", () => {
      it("should return 401 Unauthroized if no token is passed", async () => {
        if (!app) return;
        const auctionID = 12;

        await supertest(app).get(`/auction/${auctionID}/bids`).expect(401);
      });
    });

    describe("given the token is given in request", () => {
      it("should return 200 status", async () => {
        if (!app) return;

        const auctionID = 12;

        await supertest(app)
          .get(`/auction/${auctionID}/bids`)
          .set(
            "Authorization",
            `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6NCwiZW1haWwiOiJhc2RAYXNkLmNvbSJ9LCJpYXQiOjE3MTExNzY2ODl9.qdjL004si4e_jdm0YKAFKyIEK15tVoQSiuImKcliB0M`
          )
          .expect(200);
      });
    });

    describe("given the token is given in request", () => {
      it("should return 200 status", async () => {
        if (!app) return;

        const auctionID = 12;

        await supertest(app)
          .get(`/auction/${auctionID}/bids`)
          .set(
            "Authorization",
            `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6NCwiZW1haWwiOiJhc2RAYXNkLmNvbSJ9LCJpYXQiOjE3MTExNzY2ODl9.qdjL004si4e_jdm0YKAFKyIEK15tVoQSiuImKcliB0M`
          )
          .expect(200);
      });
    });

    describe("should return a list of bids", () => {
      it("should return 200 status", async () => {
        if (!app) return;

        const auctionID = 0;

        await supertest(app)
          .get(`/auction/${auctionID}/bids`)
          .set(
            "Authorization",
            `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6NCwiZW1haWwiOiJhc2RAYXNkLmNvbSJ9LCJpYXQiOjE3MTExNzY2ODl9.qdjL004si4e_jdm0YKAFKyIEK15tVoQSiuImKcliB0M`
          )
          .expect(200)
          .expect((res) => {
            expect(res.body.list.length).toBe(0);
          });
      });
    });
  });
});
