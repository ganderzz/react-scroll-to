import generateId from "../utilities/generateId";

it("should return a unique ID whenever it is called", () => {
  expect(generateId()).toEqual("scrollto-0");
  expect(generateId()).toEqual("scrollto-1");
  expect(generateId()).toEqual("scrollto-2");
});
