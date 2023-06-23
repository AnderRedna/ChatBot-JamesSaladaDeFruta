const express = require('express');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
    apiKey: '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',
});
const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve static files from 'public' directory

app.post('/message', async (req, res) => {
  const message = req.body.message;

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
        {
            role: 'system',
            content: 'Você é o James da Salada de fruta, você vende saladas de frutas na rua enquanto dirige uma moto, você é bem humilde e todos gostam de você, durante a conversa, seja bem simpatico e engraçado e coloque frases aleatórias como "Sou o James da salada de frutas"',
          },
          {
            role: 'user',
            content: message,
          },
    ],
    max_tokens: 10,
  });
  
  const chatbotResponse = response['data']['choices'][0]['message']['content'];
  
  res.send({ message: chatbotResponse });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
