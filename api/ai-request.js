

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
    if (!process.env.DEEPSEEK_API_KEY) {
  console.error('DEEPSEEK_API_KEY environment variable is not set');
  return res.status(500).json({ error: 'Server configuration error' });
}

const deepseekResponse = await fetch(
  'https://api.deepseek.com/chat/completions',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
    },
    body: JSON.stringify({
      model: model || 'deepseek-chat',
      messages: [
        {
          role: 'system',
          content:
            'You are a precise IELTS exam generator and evaluator. Always follow the exact structure specified in the prompt and return valid JSON.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.4,
      max_tokens: 8192,
      response_format: {
        type: 'json_object',
      },
    }),
  }
);

if (!deepseekResponse.ok) {
  const errorText = await deepseekResponse.text();
  console.error(errorText);

  return res.status(deepseekResponse.status).json({
    error: errorText,
  });
}

const result = await deepseekResponse.json();

let responseText = result.choices[0].message.content;
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
    catch (textError) {
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
      model: model || 'deepseek-chat',
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
