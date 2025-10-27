export const dailyPriceFormula = (
    ppOver18: number,
    peopleOver18: number,
    ppUnder18: number,
    peopleUnder18: number,
    travelDays: number
    ) => {
    return ((ppOver18 * peopleOver18) + (ppUnder18 * peopleUnder18) * travelDays)
}

export const monthlyPriceFormula = (
    ppOver18: number,
    peopleOver18: number,
    ppUnder18: number,
    peopleUnder18: number,
    travelDays: number
    ) => {
    return ((ppOver18 * peopleOver18) + (ppUnder18 * peopleUnder18)) * (Math.ceil(travelDays / 30))
}