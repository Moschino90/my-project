const express = require("express");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/health", (req, res) => {
  res.send("ok");
});

// Example: update product status
app.get("/update/:id", async (req, res) => {
  const productId = req.params.id;
  const response = await fetch(`https://${process.env.SHOPIFY_DOMAIN}/admin/api/2024-07/products/${productId}.json`, {
    method: "PUT",
    headers: {
      "X-Shopify-Access-Token": process.env.SHOPIFY_ACCESS_TOKEN,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      product: {
        id: productId,
        status: "active"
      }
    })
  });

  const data = await response.json();
  res.json(data);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
