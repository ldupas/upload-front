import { Link } from 'react-router-dom';
import { useUser } from '../../contexts/UserProvider';


const Navbar = () => {
    const { user } = useUser();

  return (
    <div>
        <div>
            {
                !user && 
                <div>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </div>
            }
        </div> 
        <div>
            {
                user &&
                <div>
                    <Link to="/admin">Admin</Link>
                    <Link to="/disconnect">Logout</Link>
                </div>
            }
        </div> 
    </div>
  )
}

export default Navbar
