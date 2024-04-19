import express from 'express';
import admin from 'firebase-admin';

const authenticateUser = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const idToken = req.headers.authorization;
  
    admin.auth().verifyIdToken(idToken!).then((decodedToken) => {
    admin.auth().getUser(decodedToken.sub).then(user => {      
    next();
    }).catch((error) => {
      console.log('Error verifying ID token:', error);
      res.status(401).json({ error: 'Invalid token' });
    });
  });
};
  export default authenticateUser;
