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
  const stats = req.body;
  const result = await aiService.generateInsights(stats);

  res.json({ result });
};

export const parseHabitInput = async (req, res) => {
  const { text } = req.body;
  const result = await aiService.parseHabits(text);

  res.json(result);
};