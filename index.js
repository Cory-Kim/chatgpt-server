import env from 'dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Configuration, OpenAIApi } from 'openai';

const app = express();

env.config();

app.use(cors());

app.use(bodyParser.json());

// Configure open api
const configuration = new Configuration({
  organization: "org-ZBSvugSeJC2AWklw6VZnEetR",
  apiKey: process.env.REACT_APP_API_KEY
});

const openai = new OpenAIApi(configuration);

// Listening
app.listen("3080", () => console.log("Listening on port 3080"));

// Dummy route to test
app.get("/", (req, res) =>
{
  res.send("Hello World!");
})

// Post route for making request
app.post('/', async (req, res) =>
{
  const { message } = req.body
  
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${message}`,
      max_tokens: 100,
      temperature: .5
    });
    res.json({ message: response.data.choices[0].text });

  } catch (error) {
    console.log(error);
    res.send(error).status(400);
  }
})