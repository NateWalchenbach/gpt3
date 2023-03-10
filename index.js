const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = 3080;
const configuration = new Configuration({
  organization: "org-j9ZLrAJQnWl4eIEvumkeCEho",
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);
app.post("/", async (req, res) => {
  const { message, currentModel } = req.body;
  console.log(req.body);
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${message}`,
    max_tokens: 1500,
    temperature: 0.5,
  });
  res.json({ message: response.data.choices[0].text });
});

app.get("/models", async (req, res) => {
  const response = await openai.listModels();
  res.json({
    models: response.data,
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
