import axios from "axios"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { addUser } from "../utils/userSlice"
import { useNavigate } from "react-router-dom"
import { BASE_URL } from "../utils/constats"


const Login = () => {

    const [emailId, setEmailId] = useState("tony@mail.com")
    const [password, setPassword] = useState("Tony@123")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")

    const [isLoginForm, setIsLoginForm] = useState(true)
    const [showPassword, setShowPassword] = useState(false)


    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [error, setError] = useState("")



    const handleLogin = async () => {

        try {
            const res = await axios.post(BASE_URL + "/login", {
                emailId,
                password
            }, { withCredentials: true })

            dispatch(addUser(res.data.data))
            return navigate("/")
        } catch (error) {
            setError(error?.response?.data.error || "Something went wrong")
            console.error(error)
        }

    }

    const handleSignUp = async () => {
        try {
            const res = await axios.post(BASE_URL + "/signup", {
                firstName,
                lastName,
                emailId,
                password
            }, { withCredentials: true })

            dispatch(addUser(res.data.data))
            return navigate("/profile")
        } catch (error) {
            setError(error?.response?.data.error || "Something went wrong")
            console.error(error)
        }
    }

    return (
        <div className="flex justify-center my-10">
            <div className="card bg-base-300 w-96 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title justify-center">
                        {isLoginForm ? "Login" : "Sign Up"}
                    </h2>
                    <div className="">

                        {!isLoginForm && <><label className="form-control w-full max-w-xs my-2">
                            <div className="label">

                                <span className="label-text">First Name</span>
                            </div>
                            <input type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="input input-bordered w-full max-w-xs" />
                        </label>

                            <label className="form-control w-full max-w-xs my-2">
                                <div className="label">

                                    <span className="label-text">Last Name</span>
                                </div>
                                <input type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="input input-bordered w-full max-w-xs" />
                            </label></>}

                        <label className="form-control w-full max-w-xs my-2">
                            <div className="label">
                                <span className="label-text">Email ID</span>
                            </div>
                            <input type="email"
                                value={emailId}
                                onChange={(e) => setEmailId(e.target.value)}
                                className="input input-bordered w-full max-w-xs" />
                        </label>

                        <label className="form-control w-full max-w-xs my-2">
                            <div className="label">
                                <span className="label-text">Password</span>
                            </div>
                            <input type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input input-bordered w-full max-w-xs" />
                        </label>

                        <div className="flex w-full max-w-xs my-2">
                            <input type="checkbox" className="checkbox m-2"
                                onClick={() => setShowPassword((value) => !value)} />
                            <div className="label">
                                <span className="label-text">Show Password</span>
                            </div>
                        </div>

                    </div>
                    <p className="text-red-500">{error}</p>
                    <div className="card-actions justify-center m-2">
                        <button className="btn btn-primary"
                            onClick={isLoginForm ? handleLogin : handleSignUp}
                        >{isLoginForm ? "Login" : "Sign Up"}</button>
                    </div>
                    <p className="cursor-pointer m-auto py-2"
                        onClick={() => setIsLoginForm((value) => !value)}>
                        {isLoginForm ?
                            "New User? Signup Here"
                            : "Exisiting User? Login Here"
                        }
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login