import { CSSProperties, RefObject, useRef, useState } from "react";

import ReactCrop, { Crop, ReactCropProps } from "react-image-crop";

interface options {
  onSelect?: () => void;
  scale?: number;
  rotate?: number;
  aspect?: number;
}

interface useCropperResult {
  Cropper: React.FC<CropperProps>;
  cropperProps: CropperProps;
  imgRef: RefObject<HTMLImageElement>;
  croppedImg: string;
  handleImageSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

import "react-image-crop/dist/ReactCrop.css";

export const useCropper = (options: options): useCropperResult => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState<Crop>();
  const [croppedImg, setCroppedImg] = useState("");

  const { aspect, onSelect } = options;
  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    console.log(files);
    if (files?.length === 0) return;
    if (typeof onSelect === "function") onSelect();
    const file = files![0];
    setImgSrc(URL.createObjectURL(file));
    console.log(file);
  };

  const cropImage = () => {
    const image = imgRef.current;
    if (!image || !crop) return;

    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
    const base64Image = canvas.toDataURL("image/jpeg", 1);
    setCroppedImg(base64Image);
  };

  const cropperProps: CropperProps = {
    cropProps: {
      onChange: (c) => setCrop(c),
      onComplete: cropImage,
      crop,
      aspect
    },
    imgRef,
    imgSrc
  };

  return {
    cropperProps,
    Cropper,
    imgRef,
    handleImageSelect,
    croppedImg
  };
};

interface CropperProps {
  imgSrc: string;
  imgRef: RefObject<HTMLImageElement>;
  cropProps: ReactCropProps;
  imgStyle?: CSSProperties;
}

const Cropper: React.FC<CropperProps> = ({
  imgSrc,
  imgRef,
  cropProps,
  imgStyle
}) => {
  return (
    <>
      {imgSrc && (
        <ReactCrop {...cropProps}>
          <img style={imgStyle} ref={imgRef} src={imgSrc} alt="crop-preview" />
        </ReactCrop>
      )}
    </>
  );
};
