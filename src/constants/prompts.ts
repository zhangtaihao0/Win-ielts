import type { Answer, Question } from '../types/Main';

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
- Task 1-2: Letter writing tasks (formal, semi-formal, or informal) OR report writing tasks based on given situations (150 words each). NO charts, graphs, tables, or diagrams.
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
      "taskType": "Task 1 - Letter/Report Writing",
      "prompt": "Complete task prompt with situation description",
      "type": "Writing",
      "minWords": 150,
      "maxWords": 200
    },
    {
      "id": "q2",
      "taskType": "Task 1 - Letter/Report Writing",
      "prompt": "Complete task prompt with situation description",
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
- Write transcripts as a single continuous monologue spoken by one person.
- Do NOT include any dialogues, conversations, or exchanges between multiple speakers.
- Avoid phrases like "excuse me", "thank you", "no problem", or anything that implies multiple people.
- Use natural spoken language WITHOUT punctuation marks (no periods, commas, question marks, or exclamation points).
- Write transcripts in natural spoken language WITHOUT any punctuation marks (no periods, commas, question marks, exclamation points).
- Use only plain text with spaces between words.
- Write numbers as words (use "twenty three" not "23").
- Spell out abbreviations when they should be pronounced as words.
- Keep sentences clear and conversational as they will be converted to speech.
- Transcript length: 80-120 words for questions 1-3, 150-180 words for questions 4-5.

QUESTION STRUCTURE:
- Question 1: Short everyday monologues (e.g., describing an activity, explaining a routine, or giving simple information such as directions or appointments).
- Question 2: Academic-style short talk (e.g., explaining a basic concept or summarizing a classroom topic).
- Question 3: Longer academic or informative monologue (e.g., presentation, radio broadcast, or report).
- Question 4: Extended academic or professional monologue involving more complex ideas or details.
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
      "transcript": "Single speaker spoken text without any punctuation marks written naturally for text to speech conversion",
      "question": "Question text",
      "type": "multiple-choice",
      "options": ["A. Complete first answer option", "B. Complete second answer option", "C. Complete third answer option", "D. Complete fourth answer option"]
    },
    {
      "id": "q2",
      "transcript": "Single speaker spoken text without any punctuation marks written naturally for text to speech conversion",
      "question": "Question text",
      "type": "fill-in-blank"
    },
    {
      "id": "q3",
      "transcript": "Single speaker spoken text without any punctuation marks written naturally for text to speech conversion",
      "question": "Question text",
      "type": "multiple-choice",
      "options": ["A. Complete first answer option", "B. Complete second answer option", "C. Complete third answer option", "D. Complete fourth answer option"]
    },
    {
      "id": "q4",
      "transcript": "Longer single speaker spoken text without any punctuation marks written naturally for text to speech conversion",
      "question": "Question text",
      "type": "true-false"
    },
    {
      "id": "q5",
      "transcript": "Longer single speaker spoken text without any punctuation marks written naturally for text to speech conversion",
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

/* ---------------- EVALUATION PROMPTS ---------------- */

export const EVALUATION_PROMPT = (
  examType: string,
  difficulty: string,
  questions: Question[],
  answers: Answer[],
): string => {
  const questionAnswerPairs = questions.map((q) => {
    const answer = answers.find((a) => a.questionId === q.id);
    return {
      questionId: q.id,
      question: q,
      userAnswer: answer?.answer || 'No answer provided',
    };
  });

  return `You are an expert IELTS examiner. Evaluate the following ${examType} test responses and provide ONLY a band score from 0 to 9.

CRITICAL: Return ONLY valid JSON with no additional text, explanations, or markdown. No backticks, no code blocks.

EXAM DETAILS:
- Type: ${examType}
- Difficulty: ${difficulty}
- Total Questions: ${questions.length}

SCORING GUIDELINES FOR ${examType.toUpperCase()}:
${getScoringGuidelines(examType)}

QUESTIONS AND ANSWERS:
${JSON.stringify(questionAnswerPairs, null, 2)}

Return this EXACT JSON structure with ONLY the score:
{
  "score": 7.5
}

The score must be a number between 0 and 9 (can include .5 decimals like 6.5, 7.0, 8.5).`;
};

function getScoringGuidelines(examType: string): string {
  switch (examType) {
    case 'Reading':
      return `Band 9: Expert understanding, all answers correct
Band 8: Very good understanding, 1-2 minor errors
Band 7: Good understanding, few errors
Band 6: Competent understanding, some errors
Band 5: Modest understanding, several errors
Band 4: Limited understanding, many errors
Band 0-3: Little to no understanding`;

    case 'Writing':
      return `Band 9: Excellent writing with sophisticated vocabulary and grammar
Band 8: Very good writing, minor errors
Band 7: Good writing, generally well-organized
Band 6: Adequate writing, some organization issues
Band 5: Limited writing skills
Band 4: Basic writing, many errors
Band 0-3: Very limited writing ability`;

    case 'Listening':
      return `Band 9: Perfect understanding, all correct
Band 8: Excellent understanding, 1-2 errors
Band 7: Good understanding, few errors
Band 6: Adequate understanding, some errors
Band 5: Modest understanding, several errors
Band 4: Limited understanding, many errors
Band 0-3: Poor understanding`;

    case 'Speaking':
      return `Band 9: Fully operational command of language
Band 8: Fully operational with occasional inaccuracies
Band 7: Good operational command
Band 6: Generally effective command
Band 5: Partial command with frequent problems
Band 4: Very limited command
Band 0-3: Essentially no ability`;

    default:
      return 'Standard IELTS band score evaluation (0-9)';
  }
}

export const AI_EVALUATION_PROMPTS = {
  EVALUATE: EVALUATION_PROMPT,
} as const;
