/* ---------------- READING ---------------- */
export const READING_PROMPT = (difficulty: string): string => `
You are an IELTS Academic exam generator. Create EXACTLY 3 reading comprehension questions.

CRITICAL: Return ONLY valid JSON with no additional text, explanations, or markdown. No backticks, no code blocks.

INSTRUCTIONS:
- Each question must include a short passage (120–150 words).
- Each passage should have 1–2 questions related to it.
- Questions can be multiple choice or short answer.
- Difficulty: ${difficulty} (Easy = simple passages, Medium = academic style, Hard = complex or abstract).

Return this EXACT JSON structure:
{
  "isValid": true,
  "examType": "Reading",
  "difficulty": "${difficulty}",
  "timeLimit": 60,
  "questions": [
    {
      "id": "q1",
      "text": "Passage with question",
      "type": "Reading"
    },
    {
      "id": "q2",
      "text": "Passage with question",
      "type": "Reading"
    },
    {
      "id": "q3",
      "text": "Passage with question",
      "type": "Reading"
    }
  ]
}
`;

/* ---------------- WRITING ---------------- */
export const WRITING_PROMPT = (difficulty: string): string => `
You are an IELTS Academic exam generator. Create EXACTLY 3 writing tasks.

CRITICAL: Return ONLY valid JSON with no additional text, explanations, or markdown. No backticks, no code blocks.

INSTRUCTIONS:
- Task 1: Describe a chart, graph, or diagram (text description only).
- Task 2: Short opinion essay (150 words).
- Task 3: Argument essay (250 words).
- Difficulty: ${difficulty} (Easy = everyday topics, Hard = abstract/global).

Return this EXACT JSON structure:
{
  "isValid": true,
  "examType": "Writing",
  "difficulty": "${difficulty}",
  "timeLimit": 60,
  "questions": [
    {
      "id": "q1",
      "text": "Task 1 prompt",
      "type": "Writing",
      "maxWords": 150
    },
    {
      "id": "q2",
      "text": "Task 2 prompt",
      "type": "Writing",
      "maxWords": 250
    },
    {
      "id": "q3",
      "text": "Task 3 prompt",
      "type": "Writing",
      "maxWords": 250
    }
  ]
}
`;

/* ---------------- LISTENING ---------------- */
export const LISTENING_PROMPT = (difficulty: string): string => `
You are an IELTS Academic exam generator. Create EXACTLY 3 listening comprehension questions.

CRITICAL: Return ONLY valid JSON with no additional text, explanations, or markdown. No backticks, no code blocks.

INSTRUCTIONS:
- Each question should include a short transcript (2–4 sentences).
- Add a question related to the transcript (MCQ, true/false, or fill-in-the-blank).
- Difficulty: ${difficulty} (Easy = everyday conversations, Medium = lectures, Hard = technical discussions).
- For now, use transcript text instead of audioUrl.

Return this EXACT JSON structure:
{
  "isValid": true,
  "examType": "Listening",
  "difficulty": "${difficulty}",
  "timeLimit": 40,
  "questions": [
    {
      "id": "q1",
      "text": "Transcript with question",
      "type": "Listening"
    },
    {
      "id": "q2",
      "text": "Transcript with question",
      "type": "Listening"
    },
    {
      "id": "q3",
      "text": "Transcript with question",
      "type": "Listening"
    }
  ]
}
`;

/* ---------------- SPEAKING ---------------- */
export const SPEAKING_PROMPT = (difficulty: string): string => `
You are an IELTS Academic exam generator. Create EXACTLY 3 speaking prompts.

CRITICAL: Return ONLY valid JSON with no additional text, explanations, or markdown. No backticks, no code blocks.

INSTRUCTIONS:
- Question 1: Personal introduction or everyday topic
- Question 2: Abstract topic discussion
- Question 3: Opinion or argument about a social/global issue
- Difficulty: ${difficulty}

Return this EXACT JSON structure:
{
  "isValid": true,
  "examType": "Speaking",
  "difficulty": "${difficulty}",
  "timeLimit": 15,
  "questions": [
    {
      "id": "q1",
      "text": "Speaking prompt",
      "type": "Speaking"
    },
    {
      "id": "q2",
      "text": "Speaking prompt",
      "type": "Speaking"
    },
    {
      "id": "q3",
      "text": "Speaking prompt",
      "type": "Speaking"
    }
  ]
}
`;

export const AI_PROMPTS = {
  READING: READING_PROMPT,
  WRITING: WRITING_PROMPT,
  LISTENING: LISTENING_PROMPT,
  SPEAKING: SPEAKING_PROMPT,
} as const;