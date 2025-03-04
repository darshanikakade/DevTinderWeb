import { useState } from "react"
import UserCard from "./UserCard"
import axios from "axios"
import { useDispatch } from "react-redux"
import { addUser } from "../utils/userSlice"
import { BASE_URL } from "../utils/constats"


const EditProfile = ({ user }) => {
    const [firstName, setFirstName] = useState(user.firstName)
    const [lastName, setLastName] = useState(user.lastName)
    const [about, setAbout] = useState(user.about || "")
    const [gender, setGender] = useState(user.gender || "")
    const [age, setAge] = useState(user.age || "")
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl)
    const [error, setError] = useState("")
    const [showToast, setShowToast] = useState(false)

    const dispatch = useDispatch();

    const saveProfile = async () => {
        //Clear the errors
        setError("")
        try {
            const res = await axios.patch(BASE_URL + "/profile/edit", {
                firstName, lastName, photoUrl, about, age, gender
            }, { withCredentials: true })
            dispatch(addUser(res?.data?.data));
            setShowToast(true);
            const i = setTimeout(() => {
                setShowToast(false)
            }, 3000)
        } catch (error) {
            setError(error?.response?.data?.error?.message)
        }
    }


    return (
        <>
            <div className="flex justify-center my-10" >
                <div className="flex justify-center mx-10">
                    <div className="card bg-base-300 w-96 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title justify-center">Profile</h2>
                            <div className="">

                                <label className="form-control w-full max-w-xs my-2">
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
                                </label>

                                <label className="form-control w-full max-w-xs my-2">
                                    <div className="label">
                                        <span className="label-text">Photo URL</span>
                                    </div>
                                    <input type="text"
                                        value={photoUrl}
                                        onChange={(e) => setPhotoUrl(e.target.value)}
                                        className="input input-bordered w-full max-w-xs" />
                                </label>

                                <label className="form-control w-full max-w-xs my-2">
                                    <div className="label">

                                        <span className="label-text">Age</span>
                                    </div>
                                    <input type="number"
                                        value={age}
                                        onChange={(e) => setAge(e.target.value)}
                                        className="input input-bordered w-full max-w-xs" />
                                </label>

                                <label className="form-control w-full max-w-xs my-2">
                                    <div className="label">
                                        <span className="label-text">Gender</span>
                                    </div>

                                    <select className="select select-bordered w-full max-w-xs"
                                        value={gender}
                                        onChange={(e) => setGender(e.target.value)}
                                    >
                                        <option value="">Select</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>

                                    {/* <input type="text"
                                        value={gender}
                                        onChange={(e) => setGender(e.target.value)}
                                        className="input input-bordered w-full max-w-xs" /> */}
                                </label>

                                <label className="form-control w-full max-w-xs my-2">
                                    <div className="label">

                                        <span className="label-text">About</span>
                                    </div>

                                    <textarea className="textarea textarea-bordered w-full max-w-xs"
                                        value={about}
                                        onChange={(e) => setAbout(e.target.value)}
                                    ></textarea>
                                    {/* <input type="text"
                                        value={about}
                                        onChange={(e) => setAbout(e.target.value)}
                                        className="input input-bordered w-full max-w-xs" /> */}
                                </label>

                            </div>
                            <p className="text-red-500">{error}</p>
                            <div className="card-actions justify-center m-2">
                                <button className="btn btn-primary"
                                    onClick={saveProfile}
                                >Save</button>
                            </div>
                        </div>
                    </div>
                </div>
                <UserCard user={{ firstName, lastName, about, gender, age, photoUrl }} />
            </div>
            {showToast && <div className="toast toast-top toast-end">
                <div className="alert alert-success">
                    <span>Profile updated successfully.</span>
                </div>
            </div>}
        </>
    )
}

export default EditProfile