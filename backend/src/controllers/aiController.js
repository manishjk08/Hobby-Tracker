import * as aiService from "../service/aiService.js";

export const getSuggestions =async(req,res,next)=>{
    try{
        const data=req.body
        const result=await aiService.generateSuggestions(data)
        res.json({result})
    }catch(err){
        next(err)
    }
}
export const getInsights = async (req, res) => {
  try {
    const { totalHabits, completionRate, currentStreak, bestHabit, worstHabit } = req.body;

    if (!completionRate || !currentStreak) {
      return res.status(400).json({ success: false, message: 'Missing required stats' });
    }

    const stats = { totalHabits, completionRate, currentStreak, bestHabit, worstHabit };
    const result = await aiService.generateInsights(stats);

    res.json({ success: true, data: result });
  } catch (error) {
    console.error('Insights error:', error);
    res.status(500).json({ success: false, message: 'Failed to generate insights' });
  }
};
export const parseHabitInput = async (req, res) => {
  const { text } = req.body;
  const result = await aiService.parseHabits(text);

  res.json(result);
};