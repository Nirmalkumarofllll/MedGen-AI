const express = require('express');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
const port = 3000;

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// API endpoint to generate content
app.post('/generate-content', async (req, res) => {
    try {
      const { ageRange, gender, location, medicationType, studyDateRange, keywords } = req.body;
      const prompt =  `
      Generate 5 to 10 articles for a medical magazine targeted at cardiologists about the impact of ${medicationType} on ${keywords} in ${gender} patients aged ${ageRange} in the ${location}. 
      Articles should include recent advances and studies from ${studyDateRange}, with information sourced from medical websites such as BioMed Central and PubMed.
      Please format the output with the following instructions:
      - Each article should start with a heading "Article X" where X is the article number (1, 2, 3, to 10).
      - Use HTML <h3> tags for the heading to make them bold and slightly smaller than <h2>.
      - The content should be formatted in HTML with <p> tags for paragraphs.
      - Ensure that each article is clearly separated with proper HTML structure.
  `;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = await response.text();
      
      res.json({ text });
    } catch (error) {
      console.error('Error generating content:', error);
      res.status(500).json({ error: 'An error occurred while generating the content.' });
    }
  });
  

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});