import cookie from 'cookie';

const loginHandler = (req, res) => {
  if (req.method === 'POST') {
    const { username, password: pwd } = req.body;
    if (
      username === process.env.ADMIN_USERNAME &&
      pwd === process.env.ADMIN_PASSWORD
    ) {
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('token', process.env.TOKEN, {
          maxAge: 60 * 60, // 1 hour
          sameSite: 'strict',
          path: '/',
        })
      );
      res.status(200).json('Logged In As Admin');
    } else {
      res.status(400).json('Failed: Wrong Credentials!');
    }
  }
};

export default loginHandler;
