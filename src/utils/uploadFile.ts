import {
  uploadBytesResumable,
  getDownloadURL,
  ref,
  UploadTaskSnapshot,
  StorageError
} from "firebase/storage";
import { firebaseStorage } from "./firebase";

const onLoad = (snapshot: UploadTaskSnapshot) => {
  const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  console.log("Upload is " + progress + "% done");
  switch (snapshot.state) {
    case "paused":
      console.log("Upload is paused");
      break;
    case "running":
      console.log("Upload is running");
      break;
  }
};

const onError = (error: StorageError) => {
  // A full list of error codes is available at
  // https://firebase.google.com/docs/storage/web/handle-errors
  switch (error.code) {
    case "storage/unauthorized":
      // User doesn't have permission to access the object
      break;
    case "storage/canceled":
      // User canceled the upload
      break;
    case "storage/unknown":
      // Unknown error occurred, inspect error.serverResponse
      break;
  }
};

type options = {
  folder?: "images/" | "avatars/";
  file: File;
  onStatusChange?: (snapshot: UploadTaskSnapshot) => unknown;
  onError?: (a: StorageError) => unknown;
};

type UploadResponse = {
  success: number;
  file: {
    url: string;
  };
};

export const uploadFile = async (opts: options): Promise<UploadResponse> => {
  const folder = opts.folder || "images/";

  const metadata = {
    contentType: "image/jpeg"
  };

  const storageRef = ref(firebaseStorage, folder + opts.file.name);
  const uploadTask = uploadBytesResumable(storageRef, opts.file, metadata);

  return new Promise((res, _) => {
    uploadTask.on("state_changed", undefined, undefined, () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((url) => {
        res({ success: 1, file: { url } });
      });
    });
  });
};
