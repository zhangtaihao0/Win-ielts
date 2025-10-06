/* ---------------- READING ---------------- */
export const READING_PROMPT = (difficulty: string): string => `
You are an IELTS Academic exam generator. Create EXACTLY 5, NOT 3, NOT 4, BUT EXACTLY 5 QUESTIONS. reading comprehension questions.

CRITICAL: Return ONLY valid JSON with no additional text, explanations, or markdown. No backticks, no code blocks.

INSTRUCTIONS:
- Each question must include a passage (150–200 words for questions 1-3, 250-300 words for questions 4-5).
- Questions 1-3: Single passage with one question each (multiple choice with 4 options).
- Questions 4-5: Longer academic passages with more complex comprehension questions.
- Question types: multiple choice, true/false/not given, matching headings, or short answer.
- Difficulty: ${difficulty} (Easy = simple passages and vocabulary, Medium = academic style with moderate complexity, Hard = complex academic topics with sophisticated vocabulary).
- Topics should be diverse: science, history, technology, environment, society, etc.
- IMPORTANT: For multiple-choice questions, the "options" array MUST contain complete answer choices in the format: ["A. First complete answer text", "B. Second complete answer text", "C. Third complete answer text", "D. Fourth complete answer text"]. Do NOT just put ["A", "B", "C", "D"].

Return this EXACT JSON structure:
{
  "isValid": true,
  "examType": "Reading",
  "difficulty": "${difficulty}",
  "questions": [
    {
      "id": "q1",
      "passage": "Complete passage text here",
      "question": "Question text",
      "type": "multiple-choice",
      "options": ["A. Complete first answer option", "B. Complete second answer option", "C. Complete third answer option", "D. Complete fourth answer option"]
    },
    {
      "id": "q2",
      "passage": "Complete passage text here",
      "question": "Question text",
      "type": "multiple-choice",
      "options": ["A. Complete first answer option", "B. Complete second answer option", "C. Complete third answer option", "D. Complete fourth answer option"]
    },
    {
      "id": "q3",
      "passage": "Complete passage text here",
      "question": "Question text",
      "type": "true-false-notgiven",
      "statement": "Statement to evaluate"
    },
    {
      "id": "q4",
      "passage": "Longer academic passage text here",
      "question": "Question text",
      "type": "multiple-choice",
      "options": ["A. Complete first answer option", "B. Complete second answer option", "C. Complete third answer option", "D. Complete fourth answer option"]
    },
    {
      "id": "q5",
      "passage": "Longer academic passage text here",
      "question": "Question text",
      "type": "short-answer"
    }
  ]
}
`;

/* ---------------- WRITING ---------------- */
export const WRITING_PROMPT = (difficulty: string): string => `
You are an IELTS Academic exam generator. Create EXACTLY 5 writing tasks.

CRITICAL: Return ONLY valid JSON with no additional text, explanations, or markdown. No backticks, no code blocks.

INSTRUCTIONS:
- Task 1-2: Describe charts, graphs, tables, or diagrams (150 words each). Provide clear text descriptions of visual data.
- Task 3: Opinion essay on a familiar topic (200 words).
- Task 4: Argumentative essay discussing both sides of an issue (250 words).
- Task 5: Problem-solution or discussion essay on a complex topic (250 words).
- Difficulty: ${difficulty} (Easy = everyday topics and simple structures, Medium = current affairs and social issues, Hard = abstract concepts and global challenges).
- Include clear instructions and context for each task.

Return this EXACT JSON structure:
{
  "isValid": true,
  "examType": "Writing",
  "difficulty": "${difficulty}",
  "questions": [
    {
      "id": "q1",
      "taskType": "Task 1 - Describe Visual Data",
      "prompt": "Complete task prompt with data description",
      "type": "Writing",
      "minWords": 150,
      "maxWords": 200
    },
    {
      "id": "q2",
      "taskType": "Task 1 - Describe Visual Data",
      "prompt": "Complete task prompt with data description",
      "type": "Writing",
      "minWords": 150,
      "maxWords": 200
    },
    {
      "id": "q3",
      "taskType": "Task 2 - Opinion Essay",
      "prompt": "Complete essay prompt",
      "type": "Writing",
      "minWords": 200,
      "maxWords": 250
    },
    {
      "id": "q4",
      "taskType": "Task 2 - Argumentative Essay",
      "prompt": "Complete essay prompt",
      "type": "Writing",
      "minWords": 250,
      "maxWords": 300
    },
    {
      "id": "q5",
      "taskType": "Task 2 - Discussion/Problem-Solution Essay",
      "prompt": "Complete essay prompt",
      "type": "Writing",
      "minWords": 250,
      "maxWords": 300
    }
  ]
}
`;

/* ---------------- LISTENING ---------------- */
export const LISTENING_PROMPT = (difficulty: string): string => `
You are an IELTS Academic exam generator. Create EXACTLY 5 listening comprehension questions.

CRITICAL: Return ONLY valid JSON with no additional text, explanations, or markdown. No backticks, no code blocks.

INSTRUCTIONS FOR TEXT-TO-SPEECH OPTIMIZATION:
- Write transcripts in natural spoken language WITHOUT any punctuation marks (no periods, commas, question marks, exclamation points).
- Use only plain text with spaces between words.
- Write numbers as words (use "twenty three" not "23").
- Spell out abbreviations when they should be pronounced as words.
- Keep sentences clear and conversational as they will be converted to speech.
- Transcript length: 80-120 words for questions 1-3, 150-180 words for questions 4-5.

QUESTION STRUCTURE:
- Questions 1-2: Everyday conversations (shopping, directions, appointments).
- Question 3: Academic context (lecture excerpt, seminar discussion).
- Question 4: Longer monologue (presentation, radio broadcast).
- Question 5: Complex discussion or interview.
- Difficulty: ${difficulty} (Easy = clear speech and simple topics, Medium = academic lectures and discussions, Hard = complex ideas with various accents).
- IMPORTANT: For multiple-choice questions, the "options" array MUST contain complete answer choices in the format: ["A. Complete first answer", "B. Complete second answer", "C. Complete third answer", "D. Complete fourth answer"]. Do NOT just put ["A", "B", "C", "D"].

Return this EXACT JSON structure:
{
  "isValid": true,
  "examType": "Listening",
  "difficulty": "${difficulty}",
  "questions": [
    {
      "id": "q1",
      "transcript": "Spoken text without any punctuation marks written naturally for text to speech conversion",
      "question": "Question text",
      "type": "multiple-choice",
      "options": ["A. Complete first answer option", "B. Complete second answer option", "C. Complete third answer option", "D. Complete fourth answer option"]
    },
    {
      "id": "q2",
      "transcript": "Spoken text without any punctuation marks written naturally for text to speech conversion",
      "question": "Question text",
      "type": "fill-in-blank"
    },
    {
      "id": "q3",
      "transcript": "Spoken text without any punctuation marks written naturally for text to speech conversion",
      "question": "Question text",
      "type": "multiple-choice",
      "options": ["A. Complete first answer option", "B. Complete second answer option", "C. Complete third answer option", "D. Complete fourth answer option"]
    },
    {
      "id": "q4",
      "transcript": "Longer spoken text without any punctuation marks written naturally for text to speech conversion",
      "question": "Question text",
      "type": "true-false"
    },
    {
      "id": "q5",
      "transcript": "Longer spoken text without any punctuation marks written naturally for text to speech conversion",
      "question": "Question text",
      "type": "multiple-choice",
      "options": ["A. Complete first answer option", "B. Complete second answer option", "C. Complete third answer option", "D. Complete fourth answer option"]
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
