import {model} from "../config/gemini.js";

export const generateSuggestions= async(userData)=>{
    const prompt= `User Data: ${JSON.stringify(userData)}
    Act as habit coach and suggest 3 new habits. keep response short and give in point format, like 1,2,3... `
    const result=await model.generateContent(prompt);
    const response=await result.response
    return response.text()
}

export const parseHabits= async(text)=>{
    const prompt= `Extract the habits from the following text and return them as a JSON array: ${text} 
    Required fields for each habit:
    - title (string, short name of the habit)
    - description (string, brief details about the habit)
    - category (string, e.g., "health", "learning", "fitness", "productivity")
    
    Return ONLY the JSON array. No markdown formatting. No explanations.`;
    const result=await model.generateContent(prompt);
    const response=await result.response
    return JSON.parse(response.text())
}

//AI insights

export const generateInsights = async (stats) => {
  const prompt = `
You are a habit coach. Analyze this user's habit data and return ONLY a JSON object.

User data:
- Total habits tracked: ${stats.totalHabits}
- Overall completion rate: ${stats.completionRate}%
- Current streak: ${stats.currentStreak} days
- Longest streak ever: ${stats.longestStreak} days
- Weekly completions (Mon-Sun): ${stats.weeklyCompletions?.join(', ')}
- Most completed habit: ${stats.bestHabit}
- Most skipped habit: ${stats.worstHabit}

Return this exact shape:
{
  "summary": "1 sentence overview",
  "win": "their biggest win this week",
  "warning": "one habit at risk",
  "tip": "one specific actionable advice"
}
Return ONLY the JSON. No markdown, no explanation.
`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const match = text.match(/\{[\s\S]*\}/);
    if (!match) throw new Error('No JSON in AI response');

    return JSON.parse(match[0]);
  } catch (error) {
    console.error('AI insights failed:', error);
    return {
      summary: "Keep going — consistency builds momentum.",
      win: null,
      warning: null,
      tip: "Try completing your easiest habit first each day."
    };
  }
};