export const refreshCookieOptions = {
  httpOnly: true,
  secure: false, //set true in production 
  sameSite: 'lax',
  maxAge: Number(process.env.REFRESH_TOKEN_EXPIRES) * 24 * 60 * 60 * 1000
};