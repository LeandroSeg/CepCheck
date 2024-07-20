import React from "react";
import {
    Box,
    Button,
    Center,
    ChakraProvider,
    Editable,
    EditableInput,
    EditablePreview,
    Flex,
    Skeleton,
} from "@chakra-ui/react";
import axios, { AxiosError } from "axios";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { Container, Heading } from "@chakra-ui/react";

const containerStyle = {
    border: "1px solid #000",
    boxShadow: "15px 15px 15px rgba(0, 0, 0, 1)",
    borderRadius: "15px",
    position: "absolute",
    fontSize: "18px",
    m: "5px",
    backgroundColor: "rgba(220, 227, 233, 0.8)",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, 25% )", // Centraliza no meio
};

function App() {
    const [content, setContent] = React.useState("");
    const [logradouro, setLogradouro] = React.useState("Endereço");
    const [complemento, setComplemento] = React.useState("Complemento");
    const [bairro, setBairro] = React.useState("Bairro");
    const [localidade, setLocalidade] = React.useState("Localidade");
    const [uf, setUf] = React.useState("UF");
    const [ok, setOk] = React.useState(true);

    async function handleEdit(content) {
        try {
            setOk(false);
            const response = await axios.get(
                "https://viacep.com.br/ws/" + content + "/json/"
            );
            setLogradouro(response.data.logradouro);
            setComplemento(response.data.complemento);
            setBairro(response.data.bairro);
            setLocalidade(response.data.localidade);
            setUf(response.data.uf);

            console.log(response.data);
            setOk(true);
        } catch (error) {
            if (error instanceof AxiosError) {
                console.error(`Erro axios----: ${await error}`);
            }
            if (error.response) {
                console.error(
                    `Error ${error.response.status}: ${error.response.statusText}`
                );
            } else {
                console.error("An unexpected error occurred:", error);
            }
        }
    }

    return (
        <ChakraProvider>
            <Container sx={containerStyle}>
                <Container
                    padding="1px"
                    margin={1}
                    display="flex"
                    justifyContent="center"
                    flexDirection="column"
                    alignItems="center"
                >
                    <Heading as="h2" size="xl" p="20px">
                        Buscador de CEP (REACT)
                    </Heading>
                    <Editable
                        m="5px"
                        p="1px"
                        borderWidth={2}
                        borderRadius={7}
                        defaultValue="Digite o CEP aqui"
                        alignContent="Center"
                        width={150}
                        onChange={(e) => setContent(e)}
                    >
                        <EditablePreview />
                        <EditableInput />
                    </Editable>
                    <Button m="20px" onClick={() => handleEdit(content)}>
                        Buscar em ViaCEP
                    </Button>
                    <Card m="10px" w="400px">
                        <CardHeader>
                            <h2>Dados do CEP consultado</h2>
                        </CardHeader>
                        <CardBody width={300}>
                            <Flex direction="column" paddingLeft="100px">
                                <Skeleton isLoaded={ok} m="5px">
                                    <Box bgColor="gray.100" flex="2" p="15px">
                                        {logradouro}
                                    </Box>
                                </Skeleton>
                                <Skeleton isLoaded={ok} m="5px">
                                    <Box bgColor="gray.100" flex="1" p="5px">
                                        {complemento}
                                    </Box>
                                </Skeleton>
                                <Skeleton isLoaded={ok} m="5px">
                                    <Box bgColor="gray.100" flex="1" p="5px">
                                        {bairro}
                                    </Box>
                                </Skeleton>
                                <Skeleton isLoaded={ok} m="5px">
                                    <Box bgColor="gray.100" flex="1" p="5px">
                                        {localidade}
                                    </Box>
                                </Skeleton>
                                <Skeleton isLoaded={ok} m="5px">
                                    <Box bgColor="gray.100" flex="1" p="5px">
                                        {uf}
                                    </Box>
                                </Skeleton>
                            </Flex>
                        </CardBody>
                    </Card>
                </Container>
            </Container>
        </ChakraProvider>
    );
}

export default App;
