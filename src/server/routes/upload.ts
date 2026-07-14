import { Router } from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { authenticate } from '../middleware/auth.js';
import { db } from '../../db/index.js';
import { media } from '../../db/schema.js';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();

// Restrict file uploads to safe types and limit size to 10MB
const upload = multer({ 
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'image/jpeg', 
      'image/png', 
      'image/webp', 
      'image/gif', 
      'application/pdf', 
      'application/msword', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only images, PDFs, and Word documents are allowed.'));
    }
  }
});

router.post('/', authenticate, upload.single('file'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: { message: 'No file provided' } });
    }

    const { folder = '/', altText = '' } = req.body;

    // Convert buffer to base64 for cloudinary upload
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;

    // We only upload to cloudinary if credentials exist, else we'd just mock it for local dev without creds
    let fileUrl = `mock-url-for-${req.file.originalname}`;
    
    if (process.env.CLOUDINARY_CLOUD_NAME) {
      const cRes = await cloudinary.uploader.upload(dataURI, {
        folder: `dipon_cms${folder !== '/' ? folder : ''}`,
        resource_type: 'auto',
      });
      fileUrl = cRes.secure_url;
    }

    const id = uuidv4();
    const newMedia = await db.insert(media).values({
      id,
      fileName: req.file.originalname,
      fileUrl,
      mimeType: req.file.mimetype,
      size: req.file.size,
      folder,
      altText,
    }).returning();

    res.status(201).json({ success: true, data: newMedia[0] });
  } catch (error) {
    next(error);
  }
});

export default router;