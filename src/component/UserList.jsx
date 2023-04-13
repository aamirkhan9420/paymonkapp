import { Box, Button, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import GridBox from './GridBox/GridBox'
import { useParams } from 'react-router-dom'
function UserList() {
    let [userList, setUserList] = useState([])
    let [currentPage, setCurrentPage] = useState(1)

    // --to check any data is already present in storage---//
    let updatedUser = JSON.parse(localStorage.getItem("updatedUser")) || []

    let getUserList = () => {

        axios.get(`https://reqres.in/api/users?page=${currentPage}`).then((res) => {
            let newList = []

            // ---to check if uselist includes the data with same id that we have updated and stored in local storage if present then userlist data replace with local storage updated data--// 
            for (let i = 0; i < res.data.data.length; i++) {
                let isPresent = false
                for (let j = 0; j < updatedUser.length; j++) {
                    if (res.data.data[i].id == updatedUser[j]?.id) {
                        res.data.data[i] = updatedUser[j]
                        newList.push(res.data.data[i])
                        isPresent = true
                    }
                }
                if (!isPresent) {
                    newList.push(res.data.data[i])
                }
            }
            if (newList.length > 0) {
                setUserList(newList)
            } else {
                setUserList(res.data.data)
            }

        }).catch((er) => {
            console.log(er)
        })
    }

    useEffect(() => {
        getUserList()
    }, [currentPage])
    return (
        <Box>
            <GridBox props={userList} />
            <Box p={5} display={"flex"} justifyContent={"center"} alignItems={"center"} gap={2} mt={10}>
                <Button color={"white"} bgColor={"orange"} isDisabled={currentPage === 1} onClick={() => { setCurrentPage(currentPage - 1) }}>PREVIOUS</Button>
                <Text fontWeight={600} fontSize={20}>{currentPage}</Text>
                <Button pl={7} pr={7} color={"white"} bgColor={"orange"} isDisabled={currentPage === 2} onClick={() => { setCurrentPage(currentPage + 1) }}>NEXT</Button>
            </Box>

        </Box>
    )
}

export default UserList