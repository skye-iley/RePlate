//location will be in a context
import './Statistics_Tracker.css'

const Statistics_Tracker = () =>{
    // Necessary handlers for routing to sites
    const donators_visited = 0;
    const donations_taken = 0;
    const donations_given = 0;
    const donations_planned = 0;
    // Placeholder Handler for stuffs
    const doNothing = () => {
        void(0);
    }

    return(
        <div className = 'Statistics_Tracker'>
            <h1>Your Statistics</h1>
      
            <p>
                Visited Donators: {donators_visited}
            </p>
            <p>
                Donations Taken (REWORD THIS): {donations_taken}
            </p>
            <p>
                Donations Given: {donations_given}
            </p>
            <p>
                Donations Planned: {donations_planned}
            </p>
        </div>
    )

}
export default Statistics_Tracker