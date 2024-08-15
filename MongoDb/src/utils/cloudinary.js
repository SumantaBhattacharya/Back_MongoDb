import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"

// Configuration
cloudinary.config({
    cloud_name: process.env.CLODINARY_CLOUD_NAME,
    api_key: process.env.CLODINARY_API_KEY,
    api_secret: process.env.CLODINARY_API_SECRET  // Click 'View Credentials' below to copy your API secret
});

const UploadOnClodinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            return null
        }
        // upload the file on clodinary
        const response = await cloudinary.uploader
            .upload(
                localFilePath, {
                resource_type: "auto",

            })
        // file has been uploaded successfully
        console.log("File is uploaded on Cloudinary", response.url);
        fs.unlinkSync(localFilePath)
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        return null
    }
}

export {UploadOnClodinary}

