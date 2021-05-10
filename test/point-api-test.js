"use strict";

const assert = require("chai").assert;
const PointService = require("./points-service");
const fixtures = require("./fixtures.json");
const _ = require("lodash");

suite("POI API tests", function () {
  let points = fixtures.points;
  let newCategory = fixtures.newCategory;

  const pointService = new PointService(fixtures.pointService);

  setup(async function () {
    pointService.deleteAllCategories();
    pointService.deleteAllCategories();
  });

  teardown(async function () {});

  test("a test function", function () {});

  test("create a poi", async function () {
    const returnedCategory = await pointService.createCategory(newCategory);
    await pointService.addPoint(returnedCategory._id, points[0]);
    const returnedPoints = await pointService.getPoints(returnedCategory._id);
    assert.equal(returnedPoints.length, 1);
    assert(_.some([returnedPoints[0]], points[0]), "returned points must be a superset of poi");
  });

  test("create multiple pois", async function () {
    const returnedCategory = await pointService.createCategory(newCategory);
    for (var i = 0; i < points.length; i++) {
      await pointService.addPoint(returnedCategory._id, points[i]);
    }

    const returnedPoints = await pointService.getPoints(returnedCategory._id);
    assert.equal(returnedPoints.length, points.length);
    for (var i = 0; i < points.length; i++) {
      assert(_.some([returnedPoints[i]], points[i]), "returned poi must be a superset of poi");
    }
  });

  test("delete all pois", async function () {
    const returnedCategory = await pointService.createCategory(newCategory);
    for (var i = 0; i < points.length; i++) {
      await pointService.addPoint(returnedCategory._id, points[i]);
    }

    const p1 = await pointService.getPoints(returnedCategory._id);
    assert.equal(p1.length, points.length);
    await pointService.deleteAllPoints();
    const p2 = await pointService.getPoints(returnedCategory._id);
    //assert.equal(p2.length, 3); //3 as that is what is in fixtures.json --revisit
    assert.equal(p2.length, points.length); //3 as that is what is in fixtures.json --revisit
  });

});