import dayjs from "dayjs"
import { useState } from "react"

const DateOfBirth = () => {
    const [date, setDate] = useState('')
    const [error, setError] = useState('')

    const checkDate = (newDate: string) => {
        const selectedDate = dayjs(newDate)
        const today = dayjs()
        const diff = selectedDate.diff(today, 'year', true)
        if (diff > 0) {
            setError('gebruik een datum voor vandaag')
        } else if (diff > -18) {
            setError('je moet minimaal 18 jaar oud zijn')
        } else {
            setDate(newDate)
            setError('')
        }
    }
    
    return(
        <>
            <div className={"inputField"}>
                <label>
                    Geboortedatum
                    <input type="date" name="dateOfBirth" value={date} onChange={e => checkDate(e.target.value)} required />
                </label>
            </div>
            <span className={"error"}>{error}</span>
        </>
    )
}

export default DateOfBirth
