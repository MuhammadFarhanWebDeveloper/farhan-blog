import jsonwebtoken from "jsonwebtoken";

const isUserLoggedIn = async (req, res, next) => {
  const authtoken = req.cookies.authtoken;
  if (!authtoken) {
    return res
      .status(401)
      .json({ success: false, error: "Please authenticate first!" });
  }

  try {
    const data = jsonwebtoken.verify(authtoken, process.env.JWT_SECRET);
    req.user = data.id;
    req.isAdmin = data.isAdmin;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      error: "Please authenticate using a valid token",
    });
  }
};

export default isUserLoggedIn;
