
import multer from 'multer';
import admin from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';

const serviceAccount = require('path/to/firebase-service-account-key.json'); // Replace with your Firebase service account key path
const firebaseConfig = {
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'your-firebase-storage-bucket-url', // Replace with your Firebase Storage bucket URL
};

admin.initializeApp(firebaseConfig);
const bucket = admin.storage().bucket();
const upload = multer({dest: 'uploads/'});
