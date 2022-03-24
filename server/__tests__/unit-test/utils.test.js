const {generateMeterNumber,getTokenExpirationDate,validateUUID,getDaysDifference} = require("../../app/utils/imports");

describe("generate meter sucess", () => {
    it("it should return a 6 digits", () => {
        expect(generateMeterNumber()).toBeGreaterThanOrEqual(100000);
    });
});

describe("generate token exparation function", () => {
    it("it should return tomorrow's date", () => {
        expect(getTokenExpirationDate(100).getTime()).toBeGreaterThan(new Date().getTime());
    });
});

describe("validate UUID function", () => {
    it("Should return false", () => {
        expect(validateUUID("this-is-not-uuid")).toBe(false);
    });
});

describe("getDays difference function", () => {
    it("it Should return 10", () => {
        const date = new Date()
        expect(getDaysDifference(new Date(date.setDate(date.getDate()+10)))).toBe(10);
    });
});