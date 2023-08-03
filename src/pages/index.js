import Header from "@/components/header";
import {Box, Container, Typography, Input, Button, FormControl, InputLabel} from "@mui/material";
import {useState} from "react";
import Loader from "@/components/loader";

export default function Page() {

    const [loading, setLoading] = useState(false);
    const [fileData, setFileData] = useState("");
    const [output, setOutput] = useState("lighthouse-auto-report");
    const [error, setError] = useState(null);

    const createFileandDownload = (data) => {
        const fileData = JSON.stringify(data);
        const blob = new Blob([fileData], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `${output}.json`
        link.href = url;
        link.click();
    }

    const readFile = (evt) => {
        const fileReader = new FileReader();
        fileReader.readAsText(evt.target.files[0], "UTF-8");
        fileReader.onload = evt => {
            setFileData( evt.target.result.toString());
        };
    }

    const handler = async () => {
        if(fileData === "") {
            alert("Please select a file");
            return;
        }
        if(output === "") {
            alert("Please enter a output file name");
            return;
        }
        setLoading(true);
        fetch('/api/lighthouse', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "input": JSON.parse(fileData),
            })
        }).then( async (res) => {
            if(res.status === 200) {
                const response = await res.json() ;
                createFileandDownload(response);
            }

        }).catch((error) => {
            setError(error);
        }).finally(() => {
            setLoading(false);
        }) ;
    }

    return (
        <>
            <Header/>
            {
                error !== null ?
                    <Typography sx={{mt:4}} variant={"h6"} componant={'h1'}>
                        {error}
                    </Typography> :
                loading ?
                    <Loader/>
                    :
                    <main>
                        <Container>
                            <Typography sx={{mt:4}} variant={"h6"} componant={'h1'}>
                                Welcome to Lighthouse auto report
                            </Typography>

                            <Box display={'flex'}  justifyContent={'space-between'} sx={{my:4}}>

                                <FormControl >

                                    <Input
                                        id={'input'}
                                        onChange={readFile}
                                        type={'file'}
                                    />
                                    <Typography>
                                        Your file data : <br/>{fileData}
                                    </Typography>
                                </FormControl>

                                <FormControl>
                                    <InputLabel htmlFor={'output'}>
                                        Output file name
                                    </InputLabel>
                                    <Input
                                        id={'output'}
                                        value={output}
                                        onChange={(e) => setOutput(e.target.value)}
                                        placeholder={'Output file name'}
                                    />
                                </FormControl>

                            </Box>
                            <Button  variant={'contained'} onClick={handler}>
                                Generate report
                            </Button>
                        </Container>
                    </main>

            }
        </>

    )
}