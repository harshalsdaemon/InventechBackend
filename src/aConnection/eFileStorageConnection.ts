import cloudinary from "cloudinary";

// Cloudinary connection made through internsdaemon@gmail.com
const fileStorageConnection = () => {
  cloudinary.v2.config({
    cloud_name: 'dnndd3dyk',
    api_key: '729612211525626',
    api_secret: 'rPUHYdYLBCtnWTWG3QJdVa4uUhI'
  })
}

export default fileStorageConnection;
