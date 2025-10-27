import { useEffect, useState } from "react"
import './style/pricePanel.css'
import type { PriceInfo, FormInfo, MockData } from "./App"
import { dailyPriceFormula, monthlyPriceFormula } from './utils/priceFormulas'
import Divider from "./utils/divider"

interface PricePanelProps {
    priceInfo: PriceInfo,
    formData: FormInfo,
    priceFormula: Function,
    setPrice: Function,
    title: string,
    children?: React.ReactNode
}

interface PricePanelsProps {
    formInfo: FormInfo,
    mockData: MockData
}

function PricePanel({priceInfo, formData, priceFormula, setPrice, title, children}: PricePanelProps) {
    useEffect(() => {
        const travelDays = formData.endDate.diff(formData.startDate, 'day')
        const price = priceFormula(
            priceInfo.ppOver18,
            formData.peopleOver18,
            priceInfo.ppUnder18,
            formData.peopleUnder18,
            travelDays
        )
        setPrice(price)
    }, [priceInfo, formData, priceFormula, setPrice])

    return (
        <div className={"panel"}>
            <h2>{title}</h2>
            <span>Betaaltermijn: {priceInfo.payInterval}</span>
            <span>Dagen op reis: {formData.endDate.diff(formData.startDate, 'day')}</span>
            <Divider />
            <span>{children}</span>
        </div>
    )
}

export default function PricePanels({formInfo, mockData}: PricePanelsProps) {
	const [dailyPrice, setDailyPrice] = useState(0)
	const [continuousPrice, setContinuousPrice] = useState(0)
    const [comparedPriceAdvise, setComparedPriceAdvise] = useState('')
    const [comparedPriceMessage, setComparedPriceMessage] = useState('')

    useEffect(() => {
        if (dailyPrice < continuousPrice) {
            setComparedPriceAdvise('Kortlopende reisverzekering')
            setComparedPriceMessage('In het geval dat det u vaker op reis gaat dan eenkeer, kan het ook zijn dat de doorlopende reisverzekering voordeliger voor uw is.')
        } else if (dailyPrice > continuousPrice) {
            setComparedPriceAdvise('Doorlopende reisverzekering')
            setComparedPriceMessage('In het geval dat det u minder vaak op reis gaat kan het ook zijn dat de kortlopende reisverzekering voordeliger voor uw is.')
        } else {
            setComparedPriceAdvise('Gelijke kosten')
            setComparedPriceMessage('')
        }
    }, [dailyPrice, continuousPrice])

    return (
        <div className={'priceContainer'}>
            <div className={'prices'}>
                <PricePanel
                    priceInfo={mockData.shortDuration}
                    formData={formInfo}
                    priceFormula={dailyPriceFormula}
                    setPrice={setDailyPrice}
                    title={'Kortlopende reisverzekering'}
                >
                    <div className={"totalPrice"}>Totaal: €{dailyPrice.toFixed(2)}</div>
                </PricePanel>
                <PricePanel
                    priceInfo={mockData.continuousDuration}
                    formData={formInfo}
                    priceFormula={monthlyPriceFormula}
                    setPrice={setContinuousPrice}
                    title={'Doorlopende reisverzekering'}
                >
                    <div className={"totalPrice"}>Totaal p.m.: €{continuousPrice.toFixed(2)}</div>
                    <div className={"totalPrice"}>Totaal p.j.: €{(continuousPrice * (12/Math.ceil(formInfo.endDate.diff(formInfo.startDate, 'day') / 30))).toFixed(2)}</div>
                    <span>Dagelijks opzegbaar na het eerste jaar</span>
                </PricePanel>
            </div>
            <div className={'panel priceConclusion'}>
                <h3>keuze advies</h3>
                <h1>{comparedPriceAdvise}</h1>
                <span>{comparedPriceMessage}</span>
            </div>
        </div>
    )
}