import './App.css'
import { useState } from 'react';
import { ChakraProvider, Container, Input, Flex, Text } from '@chakra-ui/react'
import {SearchIcon} from '@chakra-ui/icons'
import api from './services/api';

function App() {

const [input, setInput] = useState('')
const [cep, setCep] = useState({})

async function handleSearch(){
  if(input){
    try{
      const response = await api.get(`${input}/json`)
      setCep(response.data)
      console.log(response.data)
      setInput('')
    }catch{
      alert('Houve um erro na busca do CEP... Sentimos muito!')
      setInput('')
    }
  }
}

  return (
    <ChakraProvider>
      <Flex
      flexDir="column" 
      alignItems="center" 
      justifyContent="center" 
      h="100vh" 
      bgColor="#121212">
        <Text 
        marginBottom="20px"  
        as="h1" 
        color="#fff" 
        fontWeight="bold" 
        fontSize="50px" 
        textAlign="center" 
        width="100%">
        Buscador CEP
        </Text>
        <Container 
        borderRadius="8px" 
        boxShadow="1px 1px 8px" 
        display="flex" w="250px" 
        justifyContent="center">
        <Input 
        bgColor="transparent" 
        value={input} 
        onChange={(e) => {setInput(e.target.value)}} 
        outline="none" 
        focusBorderColor='none'
        border="0px" 
        color="#fff" 
        w="200px" 
        borderRadius="8px" 
        placeholder='Digite o seu CEP...'>
        </Input>
        <SearchIcon 
        onClick={handleSearch} 
        cursor="pointer" 
        h="100%" 
        w="20px">
        </SearchIcon>
        </Container>

        {Object.keys(cep).length > 0 && (
          <Container>
            <Flex bgColor="#fff" borderRadius="8px" flexDir="column" alignItems="center" marginTop="20px">
              <Text fontWeight="bold" fontSize="20px" marginBottom="10px" marginTop="10px" as="span">Cep: {cep.cep}</Text>
              <Text fontWeight="bold.300" marginBottom="10px" as="span">Rua: {cep.logradouro}</Text>
              <Text fontWeight="bold.300" marginBottom="10px" as="span">Bairro: {cep.bairro}</Text>
              <Text fontWeight="bold.300s" marginBottom="10px" as="span">{cep.localidade} - {cep.uf}</Text>
              <Text fontWeight="bold.300s" marginBottom="10px" as="span">ddd: {cep.ddd}</Text>
            </Flex>
         </Container>
        )}
      </Flex>  
    </ChakraProvider>
  );
}

export default App
