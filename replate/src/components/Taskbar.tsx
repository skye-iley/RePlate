//location will be in a context
import './Taskbar.css'

const Taskbar = () =>{
    // Necessary handlers for routing to sites
    
    // Placeholder Handler for stuffs
    const doNothing = () => {
        void(0);
    }

    return(
        <div className = 'Taskbar'>
            <div className="name_logo">
                <h1>
                    RePlate <img src="./src/assets/RePlate_Logo.png" alt="Placeholder Logo"></img>
                </h1>
                
            </div>
            <div className="home_button">
                <button onClick={doNothing}>
                    Home
                </button>
            </div>
            <div className="stats_button">
                <button onClick={doNothing}>
                    Your History
                </button>
            </div>
        </div>
    )

}
export default Taskbar