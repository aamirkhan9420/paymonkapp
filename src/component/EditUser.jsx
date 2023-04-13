import { Box, FormControl, Input, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import axios from 'axios'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'

function EditUser() {
    let { state} = useLocation()
    let [firstname, setFirstName] = useState(state?.first_name || "")
    let [lastName, setLastName] = useState(state?.last_name || "")
    let [email, setEmail] = useState(state?.email || "")
    let toast = useToast()
    let navigate = useNavigate()

    // --to check any data is already present in storage---//
    let updatedUser = JSON.parse(localStorage.getItem("updatedUser")) || []


    let handleEditForm = (e) => {
        e.preventDefault()
        let data = {
            first_name: firstname,
            last_name: lastName,
            email,
            id: state.id,
            avatar: state.avatar
        }

        axios.put(`https://reqres.in/api/users/${state.id}`, data)
            .then((res) => {
                console.log(res)
                let isPresent = false

                //--if res.data  includes in updatedUser array then replace  that data with new res.data and make isPresent true--//

                for (let i = 0; i < updatedUser.length; i++) {
                    if (updatedUser[i].id === res.data.id) {
                        updatedUser[i] = res.data
                        isPresent = true
                    }
                }
              //--if isPresent is true then dont push res.data--//
                if (!isPresent) {
                    updatedUser.push(res.data)
                }
                localStorage.setItem('updatedUser', JSON.stringify(updatedUser))
                toast({ title: "User details updated", status: "success", position: "top" })
                navigate("/")

            }).catch((er) => {
                console.log(er)
            })
    }
    return (
        <Box w={"100%"} pt={100} pb={100} >
            <Box borderRadius={10} p={2} w={{ base: "90%", sm: "70%", md: "50%", lg: "35%", xl: "25%" }} margin={"auto"} fontWeight={600} bgColor={"#CD5D67"} color={"white"}>Edit user information</Box>
            <Box borderRadius={10} p={{ base: 2, sm: 10, md: 10, lg: 10, xl: 10 }} w={{ base: "90%", sm: "70%", md: "50%", lg: "35%", xl: "25%" }} margin={"auto"} boxShadow={"md"} >
                <form onSubmit={handleEditForm} >
                    <FormControl display={"flex"} flexDir={"column"} gap={10}>
                        <Input borderRadius={"none"} required={true} value={firstname} type='string' placeholder='Enter User First Name' minLength={1} maxLength={50} onChange={(e) => setFirstName(e.target.value)} />
                        <Input borderRadius={"none"} required={true} value={lastName} type='string' placeholder='Enter User Last Name' minLength={1} maxLength={50} onChange={(e) => setLastName(e.target.value)} />
                        <Input borderRadius={"none"} required={true} value={email} type='email' placeholder='Enter User Email' onChange={(e) => setEmail(e.target.value)} />
                        <Input cursor={"pointer"} type='submit' value={"Edit"} bgColor={"orange"} color={"white"} fontWeight={600} />
                    </FormControl>
                </form>

            </Box>
        </Box>
    )
}

export default EditUser