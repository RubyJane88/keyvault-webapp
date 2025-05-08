const express = require('express');
const { DefaultAzureCredential } = require('@azure/identity');
const { SecretClient } = require('@azure/keyvault-secrets');

const app = express();
const port = process.env.PORT || 3000;
const vaultUrl = 'https://api-key-demoapp-01.vault.azure.net/'; // Update with your Key Vault URL

app.get('/', async (req, res) => {
  try {
    const credential = new DefaultAzureCredential();
    const client = new SecretClient(vaultUrl, credential);
    const secret = await client.getSecret('api-key');
    res.send(`<h1>Secure Web App</h1><p>API Key: ${secret.value}</p>`);
  } catch (error) {
    res.status(500).send(`Error retrieving secret: ${error.message}`);
  }
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});