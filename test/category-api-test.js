"use strict";

const assert = require("chai").assert;
const PointsService = require("./points-service");
const fixtures = require("./fixtures.json");
const _ = require('lodash');

suite("Category API tests", function () {
  let categories = fixtures.categories;
  let newCategory = fixtures.newCategory;
  let newUser = fixtures.newUser;

  const pointsService = new PointsService("http://localhost:4000");

  suiteSetup(async function () {
    await pointsService.deleteAllUsers();
    const returnedUser = await pointsService.createUser(newUser);
    const response = await pointsService.authenticate(newUser);
  });

  suiteTeardown(async function () {
    await pointsService.deleteAllUsers();
    pointsService.clearAuth();
  })

  setup(async function () {
    await pointsService.deleteAllCategories();
  });

  teardown(async function () {
    await pointsService.deleteAllCategories();
  });

  test("create a category", async function () {
    const returnedCategory = await pointsService.createCategory(newCategory);
    assert(_.some([returnedCategory], newCategory), "returnedCategory must be a superset of newCategory");
    assert.isDefined(returnedCategory._id);
  });

  test("get category", async function () {
    const c1 = await pointsService.createCategory(newCategory);
    const c2 = await pointsService.getCategory(c1._id);
    assert.deepEqual(c1, c2);
  });

  test("get invalid category", async function () {
    const c1 = await pointsService.getCategory("1234");
    assert.isNull(c1);
    const c2 = await pointsService.getCategory("012345678901234567890123");
    assert.isNull(c2);
  });

  test("delete a category", async function () {
    let c = await pointsService.createCategory(newCategory);
    assert(c._id != null);
    await pointsService.deleteOneCategory(c._id);
    c = await pointsService.getCategory(c._id);
    assert(c == null);
  });

  test("get all categories", async function () {
    for (let c of categories) {
      await pointsService.createCategory(c);
    }

    const allCategories = await pointsService.getCategories();
    assert.equal(allCategories.length, categories.length);
  });

  test("get categories detail", async function () {
    for (let c of categories) {
      await pointsService.createCategory(c);
    }

    const allCategories = await pointsService.getCategories();
    for (var i = 0; i < categories.length; i++) {
      assert(_.some([allCategories[i]], categories[i]), "returnedCategory must be a superset of newCategory");
    }
  });

  test("get all categories empty", async function () {
    const allCategories = await pointsService.getCategories();
    assert.equal(allCategories.length, 0);
  });

});
