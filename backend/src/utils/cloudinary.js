import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY , 
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadOnCloudinary = async(localFilePath) => {
    try {
        if(!localFilePath) return null;

        //uploading file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type:'auto'
        }) // file uploaded 

        fs.unlinkSync(localFilePath) // unlinking from localstorage
        return response
    } catch (error) {
        fs.unlinkSync(localFilePath)
        return null ;
    }
}

const deleteFromCloudinary = async(publicId) => {
    try {
        const response = await cloudinary.uploader
        .destroy(publicId, {resource_type: 'image'})
        .then(result=>console.log(result));
        // image deleted from cloudinary 
        return response
    } catch (error) {
        console.log('here occurred while deleting photo');
        return null ;
    }
}

export {uploadOnCloudinary , deleteFromCloudinary}