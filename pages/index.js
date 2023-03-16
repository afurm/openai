import { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import InstagramPost from '../componnts/InstagramPost'

export default function Home() {
  const [storeName, setStoreName] = useState('');
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsloading] = useState(false)

  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(result)
      .then(() => setIsCopied(true))
      .catch(() => setIsCopied(false));
  };

  async function handleSubmit(event) {
    setIsloading(true)
    setResult('')
    setIsCopied(false)
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: storeName, product: productName, description: productDescription }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setIsloading(false)
    
    } catch(error) {
      // Consider implementing your own error handling logic here
      alert(error.message);
    }
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr", gridGap: "1rem" }}>
      {isLoading &&
        <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
        <LinearProgress color="success" />
      </Stack>
    }
    <TextField type="text" id="storeName"  value={storeName} onChange={(event) => setStoreName(event.target.value)} placeholder="Enter your store/brand name" />
    <TextField type="text" id="productName"  value={productName} onChange={(event) => setProductName(event.target.value)} placeholder="Enter your product name" />
    <TextField variant="outlined" multiline rows={4} id="productDescription"  value={productDescription} onChange={(event) => setProductDescription(event.target.value)} placeholder="Enter your product description (2-3 sentences)"/>
    <Button disabled={isLoading || storeName === '' || productName === '' || productDescription === ''} variant="contained" onClick={handleSubmit}>Generate text for post</Button>
    <InstagramPost text={result}/>
    {result && 
    <Button variant="text" color="secondary" onClick={handleCopy}>
        {isCopied ? "Copied!" : "Copy to clipboard"}
      </Button>
      }
  </div>
  );
}
