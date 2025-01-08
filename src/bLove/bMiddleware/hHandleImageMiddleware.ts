import cloudinary from 'cloudinary';


const handleImagemiddleware = async (target: { url: string, public_id: string }, folder: string, type: "create" | "update", retrieve: { url: string, public_id: string }) => {
  if (type === 'update') {
    if (target?.url?.startsWith("https://res.cloudinary.com")) {
      return target
    } else if (target?.url?.startsWith("data:image") && !retrieve.public_id) {
      const myCloud = await cloudinary.v2.uploader.upload(target.url, {
        folder: folder,
        // transformation: [
        //   { width: 500, crop: 'scale' }
        // ]
      });
  
      return {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      }   
    } else {
      await cloudinary.v2.uploader.destroy(retrieve.public_id);

      const myCloud = await cloudinary.v2.uploader.upload(target.url, {
        folder: folder,
        // transformation: [
        //   { width: 500, crop: 'scale' }
        // ]
      });
  
      return {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      }   
    }
  } else if (type === 'create') {
    const myCloud = await cloudinary.v2.uploader.upload(target.url, {
      folder: folder,
      // transformation: [
      //     { width: 500, crop: 'scale' }
      //   ]
    });
    
    return {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    }  
  }
}

export default handleImagemiddleware;
