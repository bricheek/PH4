import express from 'express';
import serviceAccount  from './service-account-key';
import admin from 'firebase-admin'
import authenticateUser from './middleware/authenticateUser';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/auth'
import { Auth } from 'firebase-admin/auth';


const app = express();
const port = 3000;
admin.initializeApp({
    credential: admin.credential.cert(JSON.stringify(serviceAccount))
});

app.post('/register', (req, res) => {
    const {  email, password } = req.body;
    admin.auth().createUser({
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
    const auth = getAuth(app)
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