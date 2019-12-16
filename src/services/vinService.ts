import { get } from "../utils/https"

const invalidChars = new RegExp(/[IOQ]/, "g")

export const filter = (vin: string) =>
    vin
        .toUpperCase()
        .replace(invalidChars, "")
        .slice(0, 17)

export const validate = (_vin: string): string => (_vin.length < 17 ? "17 chars expected" : null)

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
            if (verifyError(data)) throw new Error("Something went wrong")
            return convert(data.Results[0])
        })
        .catch(err => err)
}

export const verifyError = (data: VinCheckResponse): boolean => {
    if (!data) return true
    if (data.Results.length === 0 || (data.Results[0].Make === "" && data.Results[0])) return true
    return false
}
