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

STRICT EVALUATION CRITERIA FOR ALL TEST TYPES:

${getStrictCriteria(examType)}

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
Band 3: Very limited understanding, most answers wrong
Band 2: Extremely limited, almost all answers wrong or irrelevant
Band 1: No understanding, random answers or copied words
Band 0: No attempt or completely blank`;

    case 'Writing':
      return `Band 9: Excellent writing with sophisticated vocabulary, complex grammar, fully addresses task, 0 errors
Band 8: Very good writing, minor errors, clear organization, fully addresses task
Band 7: Good writing, generally well-organized, addresses task with some development
Band 6: Adequate writing, addresses task but with limitations, some organization issues
Band 5: Limited writing skills, partially addresses task, frequent errors
Band 4: Basic writing, many errors, minimal task achievement, very limited vocabulary
Band 3: Extremely limited writing, barely addresses task, severe errors throughout
Band 2: Hardly any valid communication, may copy from prompt, extremely limited
Band 1: No communication possible, random words/characters
Band 0: No attempt or completely blank`;

    case 'Listening':
      return `Band 9: Perfect understanding, all correct
Band 8: Excellent understanding, 1-2 errors
Band 7: Good understanding, few errors
Band 6: Adequate understanding, some errors
Band 5: Modest understanding, several errors
Band 4: Limited understanding, many errors
Band 3: Very limited understanding, most answers wrong
Band 2: Extremely limited, almost all wrong or irrelevant
Band 1: No understanding, random answers
Band 0: No attempt or completely blank`;

    case 'Speaking':
      return `Band 9: Fully operational command of language, fluent and precise
Band 8: Fully operational with occasional inaccuracies, fluent
Band 7: Good operational command, some fluency issues
Band 6: Generally effective command, noticeable limitations
Band 5: Partial command with frequent problems
Band 4: Very limited command, basic communication only
Band 3: Extremely limited, struggles to convey basic meaning
Band 2: Hardly any communication, isolated words only
Band 1: No communication possible, essentially silent
Band 0: No attempt`;

    default:
      return 'Standard IELTS band score evaluation (0-9)';
  }
}

function getStrictCriteria(examType: string): string {
  switch (examType) {
    case 'Reading':
      return `STRICT READING EVALUATION CRITERIA:
1. ACCURACY IS EVERYTHING: Score strictly based on percentage of correct answers
   - 90-100% correct = Band 8-9
   - 70-89% correct = Band 6-7
   - 50-69% correct = Band 5
   - 30-49% correct = Band 3-4
   - 10-29% correct = Band 2
   - 0-9% correct = Band 0-1

2. NO PARTIAL CREDIT: Each answer is either fully correct or fully wrong
3. NO ANSWER = WRONG: Treat "No answer provided" or blank as incorrect
4. GIBBERISH = WRONG: "testing", "test", "hi", "idk", random letters = incorrect
5. WRONG LETTER/OPTION = WRONG: No credit for close attempts

Examples of Band 0-2 responses:
- 0-1 correct answers out of 5 questions (0-20%)
- Most answers are "testing", "test", "hi", "idk", single letters, or gibberish
- No genuine attempt to read and comprehend the text

Band 3-4 responses (30-49% correct):
- 2 correct answers out of 5-6 questions
- Shows SOME basic comprehension
- Mix of correct and incorrect, but more wrong than right

Band 5+ responses (50%+ correct):
- At least half the answers are correct
- Clear evidence of reading comprehension

CALCULATE THE SCORE MATHEMATICALLY:
- Count correct answers
- Divide by total questions
- Apply the percentage bands above STRICTLY

Be VERY strict: 1 out of 5 correct (20%) = Band 1.5-2.5 maximum.`;

    case 'Writing':
      return `STRICT WRITING EVALUATION CRITERIA:
1. WORD COUNT ENFORCEMENT:
   - Less than 20% of required words = Band 0-1
   - 20-40% of required words = Band 2-3
   - 40-60% of required words = Band 3-4
   - 60-80% of required words = Maximum Band 5-6
   - 80%+ of required words = Eligible for Band 6+

2. TASK RESPONSE (combined with word count):
   - Random text, single words, gibberish = Band 0-1
   - Off-topic but some sentences = Band 2-3
   - Partially addresses task = Band 4-5
   - Fully addresses task = Band 6+

3. COHERENCE & COHESION:
   - No structure or organization = Band 0-2
   - Very basic structure = Band 3-4
   - Clear structure = Band 5+

4. VOCABULARY & GRAMMAR:
   - No proper sentences = Band 0-1
   - Basic words, many errors = Band 2-3
   - Limited range, some errors = Band 4-5
   - Good range, few errors = Band 6+

Examples of Band 0-2 responses:
- "testing", "test", "hi" (under 10 words)
- Random characters or gibberish
- Completely off-topic (under 50 words)

EVALUATE EACH CRITERION and take the LOWEST score as the final band.

Be VERY strict: If word count is under 20%, maximum Band 1.5.`;

    case 'Listening':
      return `STRICT LISTENING EVALUATION CRITERIA:
1. ACCURACY IS EVERYTHING: Score strictly based on percentage of correct answers
   - 90-100% correct = Band 8-9
   - 70-89% correct = Band 6-7
   - 50-69% correct = Band 5
   - 30-49% correct = Band 3-4
   - 10-29% correct = Band 2
   - 0-9% correct = Band 0-1

2. NO PARTIAL CREDIT: Each answer is either fully correct or fully wrong
3. NO ANSWER = WRONG: Blank or "No answer provided" = incorrect
4. GIBBERISH = WRONG: "testing", "test", "idk", random words = incorrect
5. SPELLING MATTERS: Answers must be spelled correctly or closely enough

Examples of Band 0-2 responses:
- 0-1 correct out of 5 (0-20%)
- All answers are "testing", "idk", random words, or gibberish
- No evidence of listening comprehension

Band 3-4 responses (30-49% correct):
- 2 correct out of 5-6 questions
- SOME evidence of understanding parts of the audio

CALCULATE THE SCORE MATHEMATICALLY:
- Count correct answers
- Divide by total questions
- Apply the percentage bands above STRICTLY

Be VERY strict: 1 out of 5 correct (20%) = Band 1.5-2.5 maximum.`;

    case 'Speaking':
      return `STRICT SPEAKING EVALUATION CRITERIA:
1. WORD COUNT & EFFORT:
   - Under 20 words total across all responses = Band 0-1
   - 20-40 words with minimal sentences = Band 2-3
   - 40-80 words with some structure = Band 4-5
   - 80+ words with good development = Band 6+

2. FLUENCY & COHERENCE:
   - Single words only = Band 0-1
   - Very short phrases, no flow = Band 2-3
   - Basic sentences with hesitation = Band 4-5
   - Connected speech = Band 6+

3. VOCABULARY & GRAMMAR:
   - Random words, no sentences = Band 0-1
   - Very limited vocabulary, basic errors = Band 2-3
   - Simple vocabulary, some errors = Band 4-5
   - Good range, fewer errors = Band 6+

Examples of Band 0-2 responses:
- "testing", "ok", "yes", "hi" (under 20 words total)
- Gibberish or incomprehensible text
- No complete sentences

Band 3-4 responses:
- At least 40-60 words across responses
- Some complete sentences (even if basic)
- Basic vocabulary attempts

EVALUATE EACH CRITERION and take the LOWEST score as the final band.

Be VERY strict: Under 20 words total = Band 0-1.5 maximum.`;

    default:
      return `Be strict: Evaluate genuine attempts vs random/minimal responses. No real attempt = Band 0-2.`;
  }
}

export const AI_EVALUATION_PROMPTS = {
  EVALUATE: EVALUATION_PROMPT,
} as const;
