import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const { prompt, model } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }
    if (!process.env.GOOGLE_API_KEY) {
      console.error('GOOGLE_API_KEY environment variable is not set');
      return res.status(500).json({ error: 'Server configuration error' });
    }
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const aiModel = genAI.getGenerativeModel({
      model: model || 'gemini-2.5-flash',
      systemInstruction:
        'You are a precise IELTS exam generator and evaluator. Always follow the exact structure specified in the prompt and return valid JSON.',
    });
    const result = await aiModel.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        maxOutputTokens: 8192,
        temperature: 0.4,
        topK: 40,
        topP: 0.95,
        responseMimeType: 'application/json',
      },
      safetySettings: [
        {
          category: 'HARM_CATEGORY_HARASSMENT',
          threshold: 'BLOCK_NONE',
        },
        {
          category: 'HARM_CATEGORY_HATE_SPEECH',
          threshold: 'BLOCK_NONE',
        },
        {
          category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
          threshold: 'BLOCK_NONE',
        },
        {
          category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
          threshold: 'BLOCK_NONE',
        },
      ],
    });
    if (!result.response) {
      console.error('No response object from AI');
      return res.status(500).json({
        error: 'No response from AI model',
      });
    }
    const safetyRatings = result.response.promptFeedback;
    if (safetyRatings?.blockReason) {
      console.error('Content blocked:', safetyRatings.blockReason);
      return res.status(400).json({
        error: 'Content was blocked by safety filters',
        reason: safetyRatings.blockReason,
      });
    }
    let responseText;
    try {
      responseText = result.response.text();
    } catch (textError) {
      console.error('Error extracting text:', textError);
      console.error('Response candidates:', JSON.stringify(result.response.candidates, null, 2));
      return res.status(500).json({
        error: 'Failed to extract text from AI response',
        details: textError.message,
      });
    }
    if (!responseText || responseText.trim() === '') {
      console.error('Empty response text');
      console.error('Full response:', JSON.stringify(result.response, null, 2));
      return res.status(500).json({
        error: 'Empty response from AI model',
        details:
          'The AI returned an empty response. This might be due to safety filters or model configuration.',
      });
    }
    // Clean markdown formatting //
    responseText = responseText
      .trim()
      .replace(/```json\s*/g, '')
      .replace(/```\s*/g, '')
      .replace(/^[^{]*/, '')
      .replace(/[^}]*$/, '')
      .trim();
    // Extract JSON //
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      responseText = jsonMatch[0];
    }
    // Validate JSON //
    let parsedJson;
    try {
      parsedJson = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Invalid JSON from AI:', responseText.substring(0, 500));
      return res.status(500).json({
        error: 'AI returned invalid JSON',
        details: responseText.substring(0, 300),
        parseError: parseError.message,
      });
    }
    const isTestGeneration = parsedJson.isValid && parsedJson.examType && parsedJson.questions;
    const isEvaluation = typeof parsedJson.score === 'number';
    if (!isTestGeneration && !isEvaluation) {
      console.error('Invalid structure:', parsedJson);
      return res.status(500).json({
        error: 'AI response missing required fields',
        received: parsedJson,
      });
    }
    return res.json({
      text: responseText,
      model: model || 'gemini-2.5-flash',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('AI API Error:', error);
    console.error('Error stack:', error.stack);
    if (error.message?.includes('API key')) {
      return res.status(401).json({ error: 'Invalid API key' });
    }
    if (error.message?.includes('quota')) {
      return res.status(429).json({ error: 'API quota exceeded' });
    }
    if (error.message?.includes('models/gemini')) {
      return res.status(400).json({
        error: 'Invalid model specified',
        details: error.message,
      });
    }
    return res.status(500).json({
      error: 'Failed to generate AI response',
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    });
  }
}
