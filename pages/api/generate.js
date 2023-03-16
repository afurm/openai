import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const name = req.body.name || '';
  if (name.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid name",
      }
    });
    return;
  }

  const product = req.body.product || '';
  if (product.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid product",
      }
    });
    return;
  }

  const description = req.body.description || '';
  if (description.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid description",
      }
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      prompt: `Write an Instagram post text with hashtags for an online store. Use following information to create post: store name is ${name}, product name is: ${product} and productt description is: ${description}.`,
      "max_tokens": 4000,
      model: 'text-davinci-003'
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}
