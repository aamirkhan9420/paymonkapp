import { Box, Grid, Image, Text } from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function GridBox({ props }) {
    let location=useLocation()

    let navigate = useNavigate()
    return (
        <Box w={{ base: "90%", sm: "65%", md: "70%", lg: "60%", xl: "70%" }} margin={"auto"} mt={10}>
            <Box textAlign={"center"} w={"100%"} fontWeight={600} fontSize={25} color={"white"} p={2} mb={2} bgGradient='linear(to-r, green.200, pink.500)'>User List</Box>
            <Grid templateColumns={{ base: "repeat(1, 1fr) ", sm: "repeat(1, 1fr) ", md: "repeat(2, 1fr) ", lg: "repeat(2, 1fr) ", xl: "repeat(3, 1fr) " }} gap={5} >
                {props?.length > 0 && props.map((el, index) => (
                    <Box key={index} boxShadow={"md"} borderRadius={5} h={"fit-content"} >
                        <Box w={"100%"} cursor={"pointer"} onClick={() => navigate("/userdetails", { state: el.id })}>
                            <Image borderTopRadius={5} w={"100%"} h={250} src={el.avatar} />
                        </Box>
                        <Box textAlign={"left"} pt={5} pl={2} pr={2} pb={2} w={"100%"} h={"fit-content"}>
                            <Text><span>First Name:</span> {el.first_name}</Text>
                            <Text><span>Last Name:</span> {el.last_name}</Text>
                            <EditIcon cursor={"pointer"} onClick={() => { navigate("/edituser", { state: el,p:location.pathname }) }} />
                        </Box>

                    </Box>
                ))}
            </Grid>
        </Box>
    )
}

export default GridBox