import { verify } from "jsonwebtoken";

export default (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = verify(token, "x-access-token");
    const userId = decodedToken.userId;
    if (req.body.userId && decodedToken.userId !== userId) {
      throw "UserId invalide !";
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({ error: error | "Requête non authentifiée !" });
  }
};
