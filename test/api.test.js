'use strict';

require("dotenv").config();
const chai = require("chai"), expect = chai.expect, should = chai.should(),
  assert = chai.assert;
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

const apikey = process.env.WK_API_KEY;

const Member = require('../').Member;

describe("ワンカニ API client", () => {
  let client = null;
  beforeEach(() => {
    client = new Member(apikey);
  });
  describe("Member needs an apikey to work", () => {
    it("and it needs to be valid", async () => {
      apikey.should.equal(client.token);
      const wkPromise = client.summary();
      wkPromise.should.eventually.not.be.rejectedWith(Error);
      wkPromise.should.eventually.have.property("lessons");
      wkPromise.should.eventually.have.property("next_review_at");
      wkPromise.should.eventually.have.property("reviews");
    });
  });
  describe("Member should be able to request summary ", () => {
    it("and needs no arguments for collection", () => {
      const wkPromise = client.summary();
      return Promise.all([
        wkPromise.should.not.eventually.be.rejectedWith(Error),
      ]);
    });
  });
  describe("Member should be able to update user", () => {
    it("and it needs valid fields", () => {
      const wkPromise = client.update_user();
      return wkPromise.should.eventually.be.rejectedWith(Error);
    });
  });
  describe("Member should be able to start assignment", () => {
    it("and it needs a id", () => {
      const wkPromise = client.start_assignment();
      return wkPromise.should.eventually.be.rejectedWith(Error);
    });
  });
  describe("Member should be able to create review", () => {
    it("and it needs material data", () => {
      const wkPromise = client.start_assignment();
      return wkPromise.should.eventually.be.rejectedWith(Error);
    });
  });
  describe("Member should be able to update study material", () => {
    it("and it needs the id and material data", () => {
      const wkPromise = client.start_assignment();
      return wkPromise.should.eventually.be.rejectedWith(Error);
    });
  });
});
