import { Navigate  } from 'react-router-dom';
import useAuth from "./useAuth"

function PrivateRoute({children, ...rest}) {
    const {token,auth} = useAuth()
    return token?children:<Navigate to="/" />
}

export default PrivateRoute