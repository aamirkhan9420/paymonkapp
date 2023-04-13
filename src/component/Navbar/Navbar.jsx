import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <Flex position="sticky" top={0} zIndex={700} boxShadow={"md"} h={"80px"} alignItems={"center"} justifyContent={"space-between"} p={2} bgColor={"#CD5D67"} color={"white"}>
            <Link to={"/"}>
                <Box bgGradient='linear(to-l, #7928CA, #FF0080)' p={2}>
                    UserManagement
                </Box>
            </Link>

        </Flex>
    )
}

export default Navbar