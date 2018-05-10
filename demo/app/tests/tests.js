var SinchNew = require("nativescript-sinch-new").SinchNew;
var sinchNew = new SinchNew();

describe("greet function", function() {
    it("exists", function() {
        expect(sinchNew.greet).toBeDefined();
    });

    it("returns a string", function() {
        expect(sinchNew.greet()).toEqual("Hello, NS");
    });
});