import dayjs from "dayjs"
import { useState } from "react"

const TravelTime = () => {
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [error, setError] = useState('')

        const checkStartDate = (newDate: string) => {
            const newStartDate = dayjs(newDate)
            const today = dayjs()
            const diffToday = newStartDate.diff(today)
            const diffEndDate = newStartDate.diff(endDate)            
            if (diffToday < 0) {
                setError('gebruik een datum na vandaag')
            } else if (diffEndDate > 0) {
                setError('start datum moet voor de eind datum zijn')                
            } else {
                setStartDate(newDate)
                setError('')
            }
        }

        const checkEndDate = (newDate: string) => {
            const newEndDate = dayjs(newDate)
            const today = dayjs()
            const diffToday = newEndDate.diff(today)
            const diffStartDate = newEndDate.diff(startDate)
            if (diffToday < 0) {
                setError('gebruik een datum na vandaag')
            } else if (diffStartDate < 0) {
                setError('eind datum moet voor de start datum zijn') 
            } else {
                setEndDate(newDate)
                setError('')
            }
        }

    return(
        <>
            <div className={"inputField twoWide"}>
                <label>
                    Start datum
                    <input type="date" name="startDate" value={startDate} onChange={e => checkStartDate(e.target.value)} required />
                </label>
                <label>
                    Eind datum
                    <input type="date" name="endDate" value={endDate} onChange={e => checkEndDate(e.target.value)} required />
                </label>
            </div>
            <span className={"error"}>{error}</span>
        </>
    )
}

export default TravelTime