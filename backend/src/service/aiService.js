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

export const generateInsights=async(stats)=>{
    const prompt = `User stats: ${JSON.stringify(stats)}
    Act as a habit coach and provide insights based on the user's habit tracking data. 
    Keep the response concise and focused on actionable advice.`
    const result=await model.generateContent(prompt);
    const response=await result.response
    return response.text()
}