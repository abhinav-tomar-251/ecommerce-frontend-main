const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME_CLOUDINARY}/image/upload`;

const uploadImage = async (image: File) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "nun4suxf");

    try {
        const dataResponse = await fetch(url, {
            method: "POST",
            body: formData,
        });

        if (!dataResponse.ok) {
            const errorDetails = await dataResponse.json();
            console.error('Upload failed:', errorDetails);
            throw new Error(`Upload failed: ${errorDetails.error.message}`);
        }

        const result = await dataResponse.json();
        if (!result.url) {
            throw new Error("Image upload failed, no URL returned");
        }

        return result;
    } catch (error) {
        console.error('Error during image upload:', error);
        throw error;
    }
};

export default uploadImage;
