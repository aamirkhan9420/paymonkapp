import { Box, Image, Text } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'


function UserDetails() {
    let { state } = useLocation()
    let [user, setUser] = useState()
    let navigate = useNavigate()

    // --to check any data is already present in storage---//
    let updatedUser = JSON.parse(localStorage.getItem("updatedUser")) || []

    // --fetching single user by id ie.state--//
    let getSingleUser = () => {
        axios.get(`https://reqres.in/api/users/${state}`).then((res) => {
            console.log(res.data.data)
            let isPresent = false

            for (let i = 0; i < updatedUser.length; i++) {
                if (updatedUser[i].id === res?.data.data.id) {
                    setUser(updatedUser[i])
                    isPresent = true
                }
            }
            if (!isPresent) {
                setUser(res?.data.data)
            }
        }).catch((er) => {
            console.log(er)
        })
    }

    useEffect(() => {
        getSingleUser()
    }, [])
    return (
        <Box w={"100%"} mt={10}>
            <Box textAlign={"center"} w={{ base: "90%", sm: "65%", md: "45%", lg: "35%", xl: "25%" }} m={"auto"} fontWeight={600} fontSize={25} color={"white"} p={2} mb={2} bgGradient='linear(to-r, green.200, pink.500)'>User Details</Box>
            <Box margin={"auto"} borderRadius={5} boxShadow={"md"} w={{ base: "90%", sm: "65%", md: "45%", lg: "35%", xl: "25%" }}>
                <Box w={"100%"}>
                    <Image borderTopRadius={5} w={"100%"} src={user?.avatar} />
                </Box>
                <Box textAlign={"left"} pt={5} pl={2} pr={2} pb={2} w={"100%"} h={"fit-content"}>
                    <Text><span>First Name:</span> {user?.first_name}</Text>
                    <Text><span>Last Name:</span> {user?.last_name}</Text>
                    <Text><span>Email:</span> {user?.email}</Text>
                </Box>
            </Box>
        </Box>
    )
}

export default UserDetails