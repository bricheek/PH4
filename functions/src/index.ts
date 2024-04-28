import { fbapp, fbadmin } from '../firebase-config'

import express from 'express';
import cors from 'cors';
//import authenticateUser from './middleware/authenticateUser';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/auth'
import authenticateUser from './middleware/authenticateUser';
//import { Auth } from 'firebase-admin/auth';
import * as send from './routes/send';
const app = express();
app.use(cors())
const port = 3000;


app.post('/register', (req, res) => {
    const {  email, password } = req.body;
    fbadmin.auth().createUser({
        email: email,
        password: password
    }).then((userRecord) => {
        console.log('Successfully created new user: ', userRecord.uid);
        res.status(200).json({message: 'User regiistration successful'});
    })
.catch((error) => {
  console.log('Error creating new user: ', error);
  res.status(500).json({ error: 'Error creating new user' });
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const auth = getAuth(fbapp)
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log('Successfully authenticated user:', userCredential.user.uid);
      res.status(200).json({ message: 'User login successful' });
    })
    .catch((error) => {
      console.log('Error authenticating user:', error);
      res.status(401).json({ error: 'Invalid credentials' });
    });
  });

  app.use('/send', send.router)

  app.listen(port, () => {
    console.log(`server is up on port ${port}`);
  });