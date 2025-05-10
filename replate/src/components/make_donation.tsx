import './make_donation.css'

interface location {
    name: string,
    address: string,
    businessType: string,
}
const placesList: location[] = [{
    name: "TestName",
    address: "place",
    businessType: "independent"
}]

const MakeDonationComp = () =>{
    
    // Placeholder Handler for stuffs
    const doNothing = () => {
        void(0);
    }

    return(
        <div className = 'make_donation'>
            <h1>Make a Donation</h1>
            <small>Item Name</small>
            <input type='Text' placeholder='Item Name' required></input>
            <small>Location</small>
            <select>
                {placesList.map((x,index:number) => <option value = {x.name}>{x.name}</option>)}
            </select>
            <small>Quantity</small>
            <input type='Number' placeholder='Quantity' min='0' required></input>
            <small>Expiration Date</small>
            <input type='Date'></input>
            <button onClick={doNothing}>Register Donation</button>
        </div>
    )

}
export default MakeDonationComp