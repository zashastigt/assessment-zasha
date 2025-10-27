import * as z from "zod"
import AmountOfPeople from './inputTypes/AmountOfPeople'
import DateOfBirth from './inputTypes/DateOfBirth'
import HouseNumber from './inputTypes/HouseNumber'
import PostalCode from './inputTypes/PostalCode'
import TravelTime from './inputTypes/TravelTime'
import dayjs, { Dayjs } from "dayjs"
import './style/form.css'

interface Form {
	fetchPrices: Function,
	setFormInfo: Function,
	setInfoFilledIn: Function
}

export default function Form({ fetchPrices, setFormInfo, setInfoFilledIn }: Form) {
	const FormValidation = z.strictObject({
		dateOfBirth: z.instanceof(dayjs as unknown as typeof Dayjs),
		startDate: z.instanceof(dayjs as unknown as typeof Dayjs),
		endDate: z.instanceof(dayjs as unknown as typeof Dayjs),
		peopleOver18: z.number().int(),
		peopleUnder18: z.number().int(),
		postalCode: z.stringFormat("postalCode", /^\d{4}[A-Z]{2}$/),
		houseNumber: z.stringFormat("houseNumber", /^\d+[a-z]?$/),
	})

  	const send = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const form = e.target as HTMLFormElement
		const formData = new FormData(form)
		const formObject = Object.fromEntries(formData)
		
		const newDateOfBirth = dayjs(formData.get("dateOfBirth") as string)
		const newStartDate = dayjs(formData.get("startDate") as string)
		const newEndDate = dayjs(formData.get("endDate") as string)
		const newPeopleOver18 = parseInt(formData.get("peopleOver18") as string)
		const newPeopleUnder18 = parseInt(formData.get("peopleUnder18") as string)
		const newPostalCode = (formData.get("postalCode") as string).toUpperCase().replaceAll(" ", "")
		const newHouseNumber = (formData.get("houseNumber") as string).toLowerCase()	

		const newFormObject = {
			...formObject,
			dateOfBirth: newDateOfBirth,
			startDate: newStartDate,
			endDate: newEndDate,
			peopleOver18: newPeopleOver18,
			peopleUnder18: newPeopleUnder18,
			postalCode: newPostalCode,
			houseNumber: newHouseNumber
		}

		const zodResult = FormValidation.safeParse(newFormObject)
		if (!zodResult.success) {
			zodResult.error
		} else {
			setFormInfo(newFormObject)
			fetchPrices()
			setInfoFilledIn(true)
		}
  	}

  return (
	<form className={'form'} method="post" onSubmit={send}>
		<DateOfBirth /> 
		<TravelTime />
		<AmountOfPeople />
		<PostalCode />
		<HouseNumber />
		<button type="submit">Bereken</button>
	</form>
  )
}
