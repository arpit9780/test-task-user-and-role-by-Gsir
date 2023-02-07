import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { UserList } from '../Pages/User/UserList'
import { RoleList } from '../Pages/Role/RoleList';
import { RolesForm } from '../Pages/Role/RolesForm';
import { UserForm } from '../Pages/User/UserForm';
import { Layout } from '../Components/Layout';


export const PublicRoutes = () => {
    return (
        <div>
            <Layout >
                <Routes>
                    <Route path='/' element={<UserList />} />
                    <Route path='/role/list' element={<RoleList />} />
                    <Route path='/role/form' element={<RolesForm />} />
                    <Route path='/role/form/:id' element={<RolesForm />} />
                    <Route path='/user/form' element={<UserForm />} />
                    <Route path='/user/form/:id' element={<UserForm />} />
                </Routes>
            </Layout>
        </div>
    )
}
