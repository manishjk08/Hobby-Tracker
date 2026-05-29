export const refreshCookieOptions = {
  httpOnly: true,
  secure: false, //set true in production 
  sameSite: 'lax',
  maxAge: (parseInt(process.env.REFRESH_TOKEN_EXPIRES)) *1000
};