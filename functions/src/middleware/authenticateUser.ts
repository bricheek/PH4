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

//   import { getAuth } from 'firebase-admin/auth';
// async function firebaseAuth(req, res, next) {
//   const regex = /Bearer (.+)/i;
//   try {
//     const idToken =
//       req.headers['authorization'].match(regex)?.[1];
//     req.token = await getAuth().verifyIdToken(idToken);
//     next();
//   } catch (err) {
//     res
//       .status(401)
//       .json({ error: { code: 'unauthenticated' } });
//   }
// }
// export default firebaseAuth;
