const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const crypto = require('crypto');
const Minio = require('minio');
const bodyParser = require('body-parser');
const File = require('./models/file');

const app = express();
const PORT = 3000;

const minioClient = new Minio.Client({
  endPoint: '127.0.0.1',
  port: 9000,
  useSSL: false,
  accessKey: 'admin',
  secretKey: 'password',
});

const BUCKET = 'file-bucket';
minioClient.bucketExists(BUCKET, function(err, exists) {
  if (err) throw err;
  if (!exists) {
    minioClient.makeBucket(BUCKET, 'us-east-1', function(err) {
      if (err) return console.log('Error creating bucket.', err);
      console.log('Bucket created successfully.');
    });
  }
});

mongoose.connect('mongodb+srv://mean:Narxoz-mean2024@atlascluster.mdmzvd6.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected!'))
  .catch(err => console.log(err));


const upload = multer({
  limits: { fileSize: 5 * 1024 * 1024 },
  storage: multer.memoryStorage(),
});

app.use(bodyParser.json());

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).send('No file uploaded.');
    }

    const uniqueName = crypto.createHash('sha1').update(file.originalname + Date.now()).digest('hex');
    const extension = file.originalname.split('.').pop();
    const filename = `${uniqueName}.${extension}`;

    await minioClient.putObject(BUCKET, filename, file.buffer);

    const newFile = new File({
      originalName: file.originalname,
      uniqueName: filename,
      size: file.size,
      extension: extension,
    });

    await newFile.save();

    res.status(200).json({ message: 'File uploaded successfully!', fileId: uniqueName });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/download/:fileId', async (req, res) => {
  try {
    const fileId = req.params.fileId;

    const fileData = await File.findOne({ uniqueName: new RegExp(fileId) });

    if (!fileData) {
      return res.status(404).send('File not found.');
    }

    minioClient.getObject(BUCKET, fileData.uniqueName, (err, dataStream) => {
      if (err) {
        return res.status(500).send('Error retrieving file.');
      }

      res.setHeader('Content-Disposition', `attachment; filename="${fileData.originalName}"`);
      dataStream.pipe(res);
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
