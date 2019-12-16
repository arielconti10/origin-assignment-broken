import { convert, filter, verifyError } from "./vinService"
import { vinCheckResponseFixture, vinResultEntryFixture } from "../test/fixtures"

describe("Vin Service", () => {
    describe("Check response", () => {
        it("should return true when verifyError received null", () => {
            expect(verifyError(null)).toBe(true)
        })
        it("should return true when verifyError received undefined", () => {
            expect(verifyError(undefined)).toBe(true)
        })
        it("should return true when verifyError received empty data", () => {
            expect(verifyError(vinCheckResponseFixture({ Results: [] }))).toBe(true)
        })
        it("should return true when verifyError received empty object Make", () => {
            expect(
                verifyError(
                    vinCheckResponseFixture({
                        Results: [{ Make: "", ModelYear: "", Model: "", Trim: "", VehicleType: "" }]
                    })
                )
            )
        })
    })
    describe("Response converter", () => {
        it("gives empty result when no data is given", () => expect(convert(null)).toEqual(null))
        it("gives empty result when invalid data is given", () => expect(convert({} as any)).toEqual(null))

        it("takes all values from Results", () =>
            expect(
                convert(
                    vinResultEntryFixture({
                        Make: "MAZDA",
                        ModelYear: "2010",
                        Model: "rx8",
                        VehicleType: "CAR",
                        Trim: "RX8"
                    })
                )
            ).toEqual({
                make: "MAZDA",
                year: 2010,
                model: "rx8",
                vehicleType: "CAR",
                trim: "RX8"
            }))
    })

    describe("Vin string filter", () => {
        it("uppercases given string", () => expect(filter("abc")).toEqual("ABC"))
        it("disallows IOQ", () => expect(filter("IOQabc")).toEqual("ABC"))
        it("disallows ioq", () => expect(filter("ioqabc")).toEqual("ABC"))
        it("trims to first 17 chars", () => expect(filter("SHHFN23607U002758abc")).toEqual("SHHFN23607U002758"))
    })
})
