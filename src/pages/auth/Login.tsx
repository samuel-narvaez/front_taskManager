import React, { useState } from "react";
import '../../index.css';
import { useDispatch } from "react-redux";
import { setToken } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../../api/auth";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        let values = { email, password };
        try {
            const response = await loginRequest(values);
            const token = response.data.token;

            dispatch(setToken(token));
            navigate("/tasks");
        } catch (err) {
            setError("Invalid email or password");
        }
    };
    return (
        <>
            <div style={{
                margin: "0",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minWidth: "320px",
                minHeight: "100vh",
            }}>
                <div
                    className="max-w-lg w-full p-32 bg-gradient-to-r from-light-blue-600 to-cyan-600 rounded-xl shadow-2xl overflow-hidden space-y-20"
                    style={{ animation: "slideInFromLeft 1s ease-out" }}
                >
                    <h2
                        className="text-center text-4xl font-extrabold text-white"
                        style={{ animation: "appear 2s ease-out;" }}
                    >
                        Task Management
                    </h2>
                    <form method="POST" action="#" className="space-y-10" onSubmit={handleSubmit}>
                        <div className="relative">
                            <input
                                placeholder=""
                                className="peer h-10 w-full lg:w-[15rem] border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-white-500"
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label className="absolute left-0 -top-3.5 text-white text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-white peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-white peer-focus:text-sm">
                                Email address
                            </label>
                        </div>
                        <div className="relative">
                            <input
                                placeholder=""
                                className="peer h-10 w-full lg:w-[15rem] border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-white-500"
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <label className="absolute left-0 -top-3.5 text-white text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-white peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-white peer-focus:text-sm">
                                Password
                            </label>
                        </div>
                        {error && (
                            <p className="text-red-500 text-sm text-center">{error}</p>
                        )}
                        <button type="submit" className="w-full py-2 px-4 bg-cyan-500 hover:bg-cyan-600 rounded-md shadow-lg text-white font-semibold transition duration-200">
                            Sign In
                        </button>
                    </form>

                </div>
            </div>

        </>
    );
};

export default Login;
