import { useState } from 'react'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import { FormRow, Alert } from '../../Components'
import { useAppContext } from '../../Context/appContext'

const RecruiterProfile = () => {
    const { recruiter, showAlert, displayAlert, isLoading, updateRecruiter } =
        useAppContext()
    const [name, setName] = useState(recruiter?.name)
    const [companyName, setCompanyName] = useState(recruiter?.companyName)
    const [email, setEmail] = useState(recruiter?.email)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!name || !companyName || !email) {
            displayAlert()
            return
        }
        updateRecruiter({ name, companyName, email})
    }
    return (
        <Wrapper>
            <form className='form' onSubmit={handleSubmit}>
                <h3>profile </h3>
                {showAlert && <Alert />}

                {/* name */}
                <div className='form-center'>
                    <FormRow
                        type='text'
                        name='name'
                        value={name}
                        handleChange={(e) => setName(e.target.value)}
                    />
                    <FormRow
                        labelText='Company Name'
                        type='text'
                        name='companyName'
                        value={companyName}
                        handleChange={(e) => setCompanyName(e.target.value)}
                    />
                    <FormRow
                        type='email'
                        name='email'
                        value={email}
                        handleChange={(e) => setEmail(e.target.value)}
                    />
                    <button
                        className='btn btn-block'
                        type='submit'
                        disabled={isLoading}
                    >
                        {isLoading ? 'Please Wait...' : 'save changes'}
                    </button>
                </div>
            </form>
        </Wrapper>
    )
}

export default RecruiterProfile
