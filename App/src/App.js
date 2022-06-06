import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom';
import Home from './Home';
import Products from './Products';
import Login from './Login';
import Register from './Register';
import User from './User';
import UserInfo from './UserInfo';
import UserCart from './UserCart';
import Admin from './Admin';
import ProductCreation from './ProductCreation';
import ProductEdition from './ProductEdition';
import ProductDeletion from './ProductDeletion';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' >
                    <Route path='/home' element={<Home />} />
                    <Route path='/products' element={<Products />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/user' element={<User />} />
                    <Route path='/user/info' element={<UserInfo />} />
                    <Route path='/user/cart' element={<UserCart />} />
                    <Route path='/admin' element={<Admin />} />
                    <Route path='/admin/add-product' element={<ProductCreation />} />
                    <Route path='/admin/edit-product' element={<ProductEdition />} />
                    <Route path='/admin/delete-product' element={<ProductDeletion />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;