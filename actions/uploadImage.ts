const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME_CLOUDINARY}/image/upload`;
import axios from 'axios';

const uploadImage = async (image: File) => {
  const formData = new FormData();
  formData.append('file', image);
  formData.append('upload_preset', 'nun4suxf');

  try {
    const response = await axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    if (!response.data.url) {
      throw new Error('Image upload failed, no URL returned');
    }

    return response.data;
  } catch (error) {
    console.error('Error during image upload:', error);
    throw error;
  }
};

export default uploadImage;
