import axios from "axios";

const cloudName = process.env.REACT_APP_CLOUD_NAME;
const cloudSecret = process.env.REACT_APP_CLOUD_SECRET;

export const getFileType = (memType) => {
  switch (memType) {
    case "text/plain":
      return "TXT";
    case "application/pdf":
      return "PDF";
    case "application/msword":
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      return "DOCX";
    case "application/vnd.ms-powerpoint":
    case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      return "PPTX";
    case "application/vnd.ms-excel":
    case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
      return "XLSX ";
    case "application/vnd.rar":
      return "RAR";
    case "application/zip":
      return "ZIP";
    case "audio/mpeg":
    case "audio/wav":
      return "AUDIO";
    case "video/mp4":
    case "video/mpeg":
      return "VIDEO";
    default:
      return "IMAGE";
  }
};

export const uploadFiles = async (files) => {
  let formData = new FormData();
  formData.append("upload_preset", cloudSecret);

  let uploaded = [];
  for (const f of files) {
    const { file, type } = f;
    formData.append("file", file);

    let res = await uploadToCloudinary(formData, type);
    console.log(res);
    uploaded.push({file: res, type});
  }
  return uploaded;
};

const uploadToCloudinary = async (formData, type) => {
  return new Promise(async (resolve) => {
    return await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`,
      formData
    ).then(({ data }) => {
      resolve(data);
    }).catch((err) => {
      console.error(err);
     })
  });
};
