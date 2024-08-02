
const isUserAdmin = async (req, res, next) => {
  try {
    const isUserAdmin = req.isAdmin;
    if (!isUserAdmin) {
        return res.status(401).json({success:false, message:"Sorry You're not admin"})        
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: "Unexpected error occured",
    });
  }
};

export default isUserAdmin;
