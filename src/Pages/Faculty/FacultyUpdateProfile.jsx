import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, withRouter } from 'react-router-dom'


import { facultyUpdate, facultyLogout} from '../../redux/action/facultyAction'
import FacultyHomeHelper from '../../Components/FacultyHomeHelper'


const FacultyUpdateProfile = () => {
    const store = useSelector((store) => store)
    const dispatch = useDispatch()
    const history = useHistory()
    const [gender, setGender] = useState('')
    const [facultyMobileNumber, setContactNumber] = useState('')
    const [isLoading, setIsLoading] = useState(false)


    const formHandler = async (e) => {
        e.preventDefault()
        const formData = new FormData()

        formData.append("gender", gender)
        formData.append("facultyMobileNumber", facultyMobileNumber)
        formData.append("email", store.faculty.faculty.faculty.email)
        setIsLoading(true)
        dispatch(facultyUpdate(formData, history))
        alert("Kindly login again to see updates")
        dispatch(facultyLogout())
        history.push('/')
    }

    useEffect(() => {
        if (store.faculty.updateProfileFlag) {
            setIsLoading(false)
        }
    }, [store.faculty.updateProfileFlag])
    return (
        <div>
            {store.faculty.isAuthenticated ? <>
                <FacultyHomeHelper />
                <div className="container mt-5">
                    <div className="row ">
                        <div className="col-md-5 w-100 m-auto">
                            <form onSubmit={formHandler}>
                                <div className="form-group">
                                    <label htmlFor="genderId">Gender</label>
                                    <select onChange={(e) => setGender(e.target.value)} className="form-control" id="genderId">
                                        <option>Select</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="numberId">Contact Number</label>
                                    <input onChange={(e) => setContactNumber(e.target.value)} required type="number" className="form-control" id="numberId" />
                                </div>
                                <div class="row justify-content-center">
                                    <div class="col-md-1">
                                        {
                                            isLoading && <div class="spinner-border text-primary" role="status">
                                                <span class="sr-only">Loading...</span>
                                            </div>
                                        }
                                    </div>
                                </div>
                                {!isLoading && <button type="submit" className="btn btn-info">Update</button>}
                            </form>
                        </div>
                    </div>
                </div></> : (history.push('/'))}
            
        </div>
    )
}

export default withRouter(FacultyUpdateProfile)
