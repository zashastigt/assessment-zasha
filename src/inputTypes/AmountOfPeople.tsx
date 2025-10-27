const AmountOfPeople = () => (
    <div className={"inputField twoWide"}>
        <label>
            Aantal personen boven de 18<br/>
            <input type="number" name="peopleOver18" required />
        </label>
        <label>
            Aantal personen onder de 18
            <input type="number" name="peopleUnder18" required />
        </label>
    </div>
)

export default AmountOfPeople