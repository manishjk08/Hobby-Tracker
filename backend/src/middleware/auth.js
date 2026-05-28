import jwt from 'jsonwebtoken'

 const authenticate=(req,res,next)=>{
  try{

    const authHeader=req.headers.authorization;

    if(!authHeader || !authHeader.startsWith(`Bearer `)){
        return res.status(401).json(
          {error:`no token Provided`}
        )
    }

    const token=authHeader.split(' ')[1];

    if(!token){
      return res.status(401).json({error:`Invalid token format`})
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.user = decoded; 

    next();
    
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'Token expired' })
    }
    return res.status(403).json({ error: 'Invalid token' })
  }

} 
export default authenticate