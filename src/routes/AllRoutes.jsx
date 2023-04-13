import React from 'react'
import { Route, Routes } from 'react-router-dom'
import UserList from '../component/UserList'
import UserDetails from '../component/UserDetails'
import EditUser from '../component/EditUser'

function AllRoutes() {
    return (
        <Routes>
            <Route path='/' element={<UserList />} />
            <Route path='/userdetails' element={<UserDetails />} />
            <Route path='/edituser' element={<EditUser />} />
        </Routes>
    )
}

export default AllRoutes