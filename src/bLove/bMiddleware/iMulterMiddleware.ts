import multer, { StorageEngine, FileFilterCallback } from "multer";
import { Request, Response } from "express";
import cloudinary from "cloudinary";
import path from "path";
import fs from "fs/promises";
import fileStorageConnection from "../../aConnection/eFileStorageConnection";

// 1) Initialize Cloudinary
fileStorageConnection();

// 2) Configure Multer to store files temporarily
const storage: StorageEngine = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadDir = path.join(__dirname, "uploads");

    // Ensure the uploads directory exists, create if it doesn't
    try {
      await fs.mkdir(uploadDir, { recursive: true });
      cb(null, uploadDir); // Proceed with storing the file
    } catch (error) {
      cb(new Error("Error creating upload directory"), "");
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// 3) File filter to accept only images
const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed!"));
  }
};

export const singleImageMiddleware = multer({ storage, fileFilter }).single("image");


// Single Image - List Controller
export const singleImageListController = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await cloudinary.v2.api.resources({
      type: "upload",    // Get uploaded images
      prefix: req.body.folder,  // Filter images uploaded to a specific folder (optional)
      max_results: 500,  // Number of images to return
    });

    res.status(200).json({ message: "Images fetched successfully", images: result.resources });
  } catch (error: any) {
    res.status(500).json({ message: "Error fetching images from Cloudinary", error: error.message });
  }
};

// Single Image - Create Controller
export const singleImageCreateController = async (req: Request, res: Response): Promise<void> => {
  singleImageMiddleware(req, res, async (err: any) => {
    if (err) {
      res.status(400).json({ message: "Error uploading file", error: err.message });
      return;
    }

    try {
      if (!req.file) {
        res.status(400).json({ message: "No file provided" });
        return;
      }

      if (!req.body.folder) {
        res.status(400).json({ message: "No folder name provided" });
        return;
      }

      // Upload image to Cloudinary
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: req.body.folder,
      });

      // Delete local file after upload
      await fs.unlink(req.file.path);

      // Respond with the Cloudinary URL
      res.status(200).json({ 
        message: "Image uploaded successfully", 
        create: {
          url: result.secure_url,
          pid: result.public_id,
        }
      });
    } catch (error: any) {
      res.status(500).json({ message: "Error uploading to Cloudinary", error: error.message });
    }
  });
};

// Single Image - Retireve Controller
export const singleImageRetrieveController = async (req: Request, res: Response): Promise<void> => {
  const { public_id, folder } = req.body;  // Get the public_id from the request parameters
  
  try {
    // Use Cloudinary's API to get image details by public ID
    const result = await cloudinary.v2.api.resource(`${folder}/${public_id}`);
    
    res.status(200).json({
      message: "Image fetched successfully",
      image: result
    });
  } catch (error: any) {
    res.status(500).json({ message: "Error fetching image from Cloudinary", error: error.message });
  }
};

// Single Image - Update Controller
export const singleImageUpdateController = async (req: Request, res: Response): Promise<void> => {
  singleImageMiddleware(req, res, async (err) => {
    if (err) {
      res.status(400).json({ message: "Error uploading file", error: err.message });
      return;
    }

    const { public_id, folder } = req.body; // Public ID without folder prefix

    if (!req.file) {
      res.status(400).json({ message: "No file provided" });
      return;
    }

    if (!public_id) {
      res.status(400).json({ message: "Public ID is required" });
      return;
    }

    if (!folder) {
      res.status(400).json({ message: "Folder Name is required" });
      return;
    }

    try {
      // Include the folder path in the public ID
      const folderSpecificId = `${folder}/${public_id}`;

      // Replace the existing image in Cloudinary using the folder-specific ID
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        public_id: folderSpecificId,
        overwrite: true,
      });

      // Delete the temporary file
      await fs.unlink(req.file.path);

      // Respond with updated image details
      res.status(200).json({
        message: "Image updated successfully",
        update: {
          url: result.secure_url,
          pid: result.public_id,
        }
      });
    } catch (error: any) {
      res.status(500).json({ message: "Error updating image", error: error.message });
    }
  });
};

// Single Image - Delete Controller
export const singleImageDeleteController = async (req: Request, res: Response): Promise<void> => {
  const { public_id, folder } = req.body; // Public ID without the folder prefix

  if (!public_id) {
    res.status(400).json({ message: "Public ID is required" });
    return;
  }

  if (!folder) {
    res.status(400).json({ message: "Folder Name is required" });
    return;
  }

  try {
    // Include the folder path in the public ID
    const folderSpecificId = `${folder}/${public_id}`;

    // Delete the image from Cloudinary
    const result = await cloudinary.v2.uploader.destroy(folderSpecificId);

    if (result.result === "not found") {
      res.status(404).json({ message: "Image not found" });
      return;
    }

    res.status(200).json({ message: "Image deleted successfully", public_id });
  } catch (error: any) {
    res.status(500).json({ message: "Error deleting image", error: error.message });
  }
};
