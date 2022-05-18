import axios from "axios";
import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import useTitle from "../Utilities/useTitle";

const SignUp = () => {
    useTitle("SignUp");
    const [error, setError] = useState("");
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || "/";

    const signUp = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        if (email && password && name) {
            axios
                .post("https://todo-app-react-saad.herokuapp.com/signup", {
                    name,
                    email,
                    password,
                })
                .then(({ data }) => {
                    if (data.success) {
                        localStorage.setItem("accessToken", data.token);
                        navigate("/");
                    }
                })
                .catch(({ message }) => setError(message));
        }
    };

    return (
        <div className="flex items-center justify-center p-4 sm:container sm:p-20">
            <div className="sm:w-1/3">
                <form
                    className="p-8 bg-slate-900 border border-gray-500/50 rounded-md shadow-md drop-shadow-lg text-slate-100 space-y-4"
                    onSubmit={signUp}
                >
                    <h2 className="text-center text-3xl">SignUp</h2>
                    <div className="divider" />
                    {error && (
                        <p className="p-4 mb-4 text-red-600 rounded-md">
                            {error}
                        </p>
                    )}
                    <div className="form-control">
                        <label
                            className="block mb-2 text-sm font-bold "
                            htmlFor="username"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Type here"
                            className="input input-bordered input-success w-full "
                        />
                    </div>
                    <div className="form-control">
                        <label
                            className="block mb-2 text-sm font-bold "
                            htmlFor="username"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Type here"
                            className="input input-bordered input-success w-full "
                        />
                    </div>
                    <div className="form-control">
                        <label
                            className="block mb-2 text-sm font-bold "
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Type here"
                            className="input input-bordered input-success w-full "
                        />
                    </div>
                    <div className="space-y-4">
                        <input
                            type="submit"
                            value="SignUp"
                            placeholder="Type here"
                            className="input input-bordered input-success w-full btn btn-secondary"
                        />
                    </div>
                    <div className="flex items-center justify-center mt-4">
                        <p>Already have an account?</p>
                        <NavLink to="/login" className="ml-1 text-green-600">
                            login
                        </NavLink>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
