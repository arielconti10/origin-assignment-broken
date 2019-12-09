import * as React from "react"
import { connect } from "react-redux"

import { VinInput } from "../../components/VinInput/VinInput"
import { CarInfoPreview } from "../../components/CarInfoPreview/CarInfoPreview"
import { actions, MapState, MapDispatch } from "../../store"

import "./VinCheck.scss"

type Props = Pick<RootState, "vin" | "vinCheckResult" | "vinValidationError">
type Actions = Pick<typeof actions, "setVin" | "checkVin">

const VinCheck: React.SFC<Props & Actions> = ({ setVin, vinValidationError, checkVin, vinCheckResult, vin }) => {
    return (
        <div className="container">
            <div className="logo" />
            <h3 className="vin-search-title">Decode Your Vehicle Identification Number</h3>
            <VinInput
                value={vin}
                onChange={(val: string) => {
                    setVin(val)
                }}
                error={vinValidationError}
            />
            <button
                className="button vin-button"
                disabled={vinCheckResult === "Loading"}
                onClick={() => {
                    checkVin()
                }}
            >
                Decode
            </button>
            <CarInfoPreview carInfo={vinCheckResult} />
        </div>
    )
}

const mapState: MapState<Props> = s => s
const mapDispatch: MapDispatch<Actions> = dispatch => ({
    setVin: (vin: string) => dispatch(actions.setVin(vin)),
    checkVin: () => dispatch(actions.checkVin())
})

export const VinCheckView = connect(mapState, mapDispatch)(VinCheck)
