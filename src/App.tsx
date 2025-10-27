import './style/App.css'
import Form from "./Form"
import { useState } from 'react'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import PricePanels from './PricePanel'

export interface PriceInfo {
    payInterval: string,
    ppOver18: number,
    ppUnder18: number
}

export interface MockData {
	[key: string]: PriceInfo
}

export interface FormInfo {
	dateOfBirth: Dayjs,
	startDate: Dayjs,
	endDate: Dayjs,
	peopleOver18: number,
	peopleUnder18: number,
	postalCode: string,
	houseNumber: string,
}

export default function App() {
	const [infoFilledIn, setInfoFilledIn] = useState(false)
	const [formInfo, setFormInfo] = useState<FormInfo>({
		dateOfBirth: dayjs(),
		startDate: dayjs(),
		endDate: dayjs(),
		peopleOver18: 0,
		peopleUnder18: 0,
		postalCode: '',
		houseNumber: '',
	})
	const [mockData, setMockData] = useState<MockData>({
		shortDuration: {
			payInterval: "daily",
			ppOver18: 0,
			ppUnder18: 0
		},
		continuousDuration: {
			payInterval: "monthly",
			ppOver18: 0,
			ppUnder18: 0
		}
	})	

  	const fetchPrices = () => {
		fetch('/data/mockData.json')
		.then(response => {
			if (!response.ok) {
				throw new Error('Network response was not ok')
			}
			return response.json()
		})
		.then((jsonData) => {
			setMockData(jsonData)
		})
		.catch((error) => console.error('Error fetching JSON:', error))
  	}

  return (
    <div id={'container'}>
		<Form fetchPrices={fetchPrices} setFormInfo={setFormInfo} setInfoFilledIn={setInfoFilledIn} />
		{infoFilledIn &&
			<PricePanels formInfo={formInfo} mockData={mockData} />
		}
		
    </div>
  )
}
