import { Navigate } from 'react-router-dom'
import { useAppContext } from '../Context/appContext'

const ProtectedRoute = ({ children }) => {
    const { user, recruiter } = useAppContext();
    if (user || recruiter) {
        return children
    } else {
        return <Navigate to={'/landing'} />
    }
}

export default ProtectedRoute
