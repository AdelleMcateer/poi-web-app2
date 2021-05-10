"use strict";

const assert = require("chai").assert;
const axios = require("axios");

suite("Category API tests", function () {

  test("get categories", async function () {
    const response = await axios.get("http://localhost:3000/api/categories");
    const categories = response.data;
    assert.equal(4, categories.length);

    assert.equal(categories[0].name, "North");

    assert.equal(categories[1].name, "South");

    assert.equal(categories[2].name, "East");

    assert.equal(categories[3].name, "West");
  });

  test("get one category", async function () {
    let response = await axios.get("http://localhost:3000/api/categories");
    const categories = response.data;
    assert.equal(4, categories.length);

    const oneCategoryUrl = "http://localhost:3000/api/categories/" + categories[0]._id;
    response = await axios.get(oneCategoryUrl);
    const oneCategory = response.data;

    assert.equal(oneCategory.name, "North");
  });

  test("create a category", async function () {
    const categoriesUrl = "http://localhost:3000/api/categories";
    const newCategory = {
      name: "North-West",
    };

    const response = await axios.post(categoriesUrl, newCategory);
    const returnedCategory = response.data;
    assert.equal(201, response.status);

    assert.equal(returnedCategory.name, "North-West");
  });

  test("delete a category", async function () {
    let response = await axios.get("http://localhost:3000/api/categories");
    let categories = response.data;
    const originalSize = categories.length;

    const oneCategoryUrl = "http://localhost:3000/api/categories/" + categories[0]._id;
    response = await axios.get(oneCategoryUrl);
    const oneCategory = response.data;
    assert.equal(oneCategory.name, "North");

    response = await axios.delete("http://localhost:3000/api/categories/" + categories[0]._id);
    assert.equal(response.data.success, true);

    response = await axios.get("http://localhost:3000/api/categories");
    categories = response.data;
    assert.equal(categories.length, originalSize - 1);
  });

  test("delete all categories", async function () {
    let response = await axios.get("http://localhost:3000/api/categories");
    let categories = response.data;
    const originalSize = categories.length;
    assert(originalSize > 0);
    response = await axios.delete("http://localhost:3000/api/categories");
    response = await axios.get("http://localhost:3000/api/categories");
    categories = response.data;
    assert.equal(categories.length, 0);
  });

});