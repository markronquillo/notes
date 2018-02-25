const expect = require("expect");
const utils = require("./utils");

it("should add two numbers async", done => {
  var res = utils.asyncAdd(1, 2, value => {
    expect(value).toBe(3);
    done();
  });
});
