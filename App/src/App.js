import React from "react";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import Login from './Login';
import Register from './Register';
import User from './User';
import UserInfo from './UserInfo';
import UserCart from './UserCart';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" >
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/user" element={<User />} />
                    <Route path="/user/info" element={<UserInfo />} />
                    <Route path="/user/cart" element={<UserCart />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;