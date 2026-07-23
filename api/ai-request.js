export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed',
    });
  }

  try {
    const { prompt, model } = req.body;

    if (!prompt) {
      return res.status(400).json({
        error: 'Prompt is required',
      });
    }

    if (!process.env.DEEPSEEK_API_KEY) {
      console.error('DEEPSEEK_API_KEY is missing');

      return res.status(500).json({
        error: 'Server configuration error',
      });
    }

    const response = await fetch(
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


    if (!response.ok) {
      const errorText = await response.text();

      console.error(errorText);

      return res.status(response.status).json({
        error: errorText,
      });
    }


    const data = await response.json();

    let responseText = data.choices?.[0]?.message?.content;


    if (!responseText) {
      return res.status(500).json({
        error: 'Empty response from AI model',
      });
    }


    // 清理 Markdown JSON 包裹
    responseText = responseText
      .trim()
      .replace(/```json\s*/g, '')
      .replace(/```\s*/g, '')
      .trim();


    const jsonMatch = responseText.match(/\{[\s\S]*\}/);

    if (jsonMatch) {
      responseText = jsonMatch[0];
    }


    let parsedJson;

    try {
      parsedJson = JSON.parse(responseText);

    } catch (error) {

      console.error(
        'Invalid JSON:',
        responseText.substring(0, 500)
      );

      return res.status(500).json({
        error: 'AI returned invalid JSON',
        details: responseText.substring(0, 300),
      });
    }


    const isTestGeneration =
      parsedJson.isValid &&
      parsedJson.examType &&
      parsedJson.questions;


    const isEvaluation =
      typeof parsedJson.score === 'number';


    if (!isTestGeneration && !isEvaluation) {

      console.error(parsedJson);

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

    return res.status(500).json({
      error: 'Failed to generate AI response',
      details: error.message,
    });

  }
}
