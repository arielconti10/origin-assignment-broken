import { get } from "../utils/https"

const invalidChars = new RegExp(/[I]/, "g")

export const filter = (vin: string) =>
    vin
        .toUpperCase()
        .replace(invalidChars, "")
        .slice(0, 17)

export const validate = (_vin: string): string => (_vin.length < 17 ? "Vin number must have 17 chars" : null)

export const convert = (_res: VinResultEntry): CarInfo => {
    return _res && _res.Make
        ? {
              make: _res.Make,
              model: _res.Model,
              year: Number(_res.ModelYear),
              trim: _res.Trim,
              vehicleType: _res.VehicleType
          }
        : null
}

export const apiCheck = async (_vin: string): Promise<CarInfo> => {
    const vinApiUrl = `https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/${_vin}?format=json`

    return get(vinApiUrl)
        .then((data: VinCheckResponse) => {
            if (!data || (data.Results.length === 0 && data.Results[0].Make === ""))
                throw new Error("Something went wrong")
            return convert(data.Results[0])
        })
        .catch(err => err)
}
