import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "./Components/404";
import Home from "./Components/Home";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}

export default App;
