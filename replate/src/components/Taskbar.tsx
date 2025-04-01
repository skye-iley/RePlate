//location will be in a context
import { Link } from 'react-router-dom';
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
            <Link to={'/'}>
                <button onClick={doNothing}>Home</button>
            </Link> 
            </div>
            <div className="stats_button">
                <Link to={'/stats'}>
                    <button onClick={doNothing}>Your History</button>
                </Link>
            </div>
            <div className="donate_button">
                <button onClick={doNothing}>
                    <Link to={'/donate'}>Donate</Link>
                </button>
            </div>
        </div>
    )
}
export default Taskbar