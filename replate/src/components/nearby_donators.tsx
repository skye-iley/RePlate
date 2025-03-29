//location will be in a context

interface location {
    name: string,
    address: string,
    businessType: string,
}
const placesList: location[] = [{
    name: "lol",
    address: "place",
    businessType: "independent"
}]

const NearbyDonationsList = () =>{
// get current location
    return(
        <div>
            <table>
                <thead>
                    <th>
                        Donator Name
                    </th>
                    <th>
                        Last restocked
                    </th>
                    <th>
                        Distance
                    </th>
                </thead>
                <tbody>
                    {placesList.map(place => (
                        <tr>
                            <tr> {place.name}</tr>
                            <tr> {place.address}</tr>
                            <tr> {place.businessType}</tr>
                        </tr>
                        )
                    )}
                </tbody>
            </table>
        </div>
    )

}
export default NearbyDonationsList