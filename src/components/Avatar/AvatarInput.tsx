import React, { useState } from "react";
import {
  Box,
  IconButton,
  Avatar,
  Button,
  Modal,
  Fade,
  Paper,
  PaperProps
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { PhotoIcon } from "../Icons";

import { useCropper } from "../../hooks/useCropper";
import { useToggle } from "../../hooks/useToggle";
import { useSnackbar } from "../../hooks/useSnackbar";

import { uploadFile } from "../../utils/uploadFile";
import { dataUrlToFile } from "../../utils/dataUrlToFile";

import {
  useUpdateCommunityMutation,
  useUpdateUserMutation
} from "../../generated/graphql";
import { LoadingButton } from "@mui/lab";

const Input = styled("input")({
  display: "none"
});

const StyledWrapper: React.FC<PaperProps> = (props) => (
  <Paper
    variant="outlined"
    sx={{
      position: "absolute" as "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      boxShadow: 24,
      p: 4
    }}
    {...props}
  />
);

interface AvatarInputProps {
  /**
   * user's id to change avatar.
   * Do not pass together with communityId.
   */
  userId?: number;
  /**
   * community's id to change avatar.
   * Do not pass together with usersId.
   */
  communityId?: number;
  /** link to render image. */
  src: string;
  variant?: "square" | "circular" | "rounded";
}

export const AvatarInput: React.FC<AvatarInputProps> = ({
  variant,
  communityId,
  src,
  userId
}) => {
  const { active: activeModal, toggle: toggleModal } = useToggle();
  const { croppedImg, cropperProps, handleImageSelect, Cropper } = useCropper({
    onSelect: toggleModal,
    aspect: 1
  });
  const { addSnackItem: Alert } = useSnackbar();

  const [updateUser] = useUpdateUserMutation();
  const [updateCommunity] = useUpdateCommunityMutation();
  const [loading, setLoading] = useState(false);

  const handleUser = (id: number, url: string) => {
    return updateUser({
      variables: { avatar: url, userId: id }
    });
  };
  const handleCommunity = (id: number, url: string) => {
    return updateCommunity({
      variables: { avatar: url, communityId: id }
    });
  };
  const createFilename = (id: number, isUser: boolean) => {
    return `${isUser ? "user" : "community"}-avatar-${id}.jpeg`;
  };

  const handleClick = async () => {
    if (!croppedImg) Alert({ message: "crop image before uploading!" });

    let isUser = !!userId;
    setLoading(true);
    const file = await dataUrlToFile(
      croppedImg,
      createFilename(userId || communityId!, isUser)
    );

    const response = await uploadFile({ file, folder: "avatars/" });
    if (response.success !== 1) {
      Alert({ message: "failed uploading!" });
      setLoading(false);
      toggleModal();
      return;
    }
    let isOk = false;
    if (!isUser) {
      const resp = await handleCommunity(communityId!, response.file.url);
      isOk = !!resp.data?.updateCommunity;
    } else {
      const resp = await handleUser(userId!, response.file.url);
      isOk = !!resp.data?.updateUser;
    }
    if (!isOk) {
      Alert({ message: "error changing avatar" });
      setLoading(false);
      toggleModal();
      return;
    }
    Alert({
      message: "image uploaded successfully!",
      severity: "success"
    });
    setLoading(false);
    toggleModal();
  };

  return (
    <>
      <Modal
        open={activeModal}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={activeModal}>
          <Paper
            variant="outlined"
            sx={{
              position: "absolute" as "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              boxShadow: 24,
              p: 4
            }}
          >
            <Cropper {...cropperProps} />

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column"
              }}
            >
              {!!croppedImg && (
                <Avatar
                  variant={variant}
                  sx={{ height: 128, width: 128 }}
                  src={croppedImg}
                />
              )}
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
            >
              <Button variant="contained" color="error" onClick={toggleModal}>
                Cancel
              </Button>

              <LoadingButton
                loading={loading}
                variant="contained"
                onClick={handleClick}
              >
                Upload!
              </LoadingButton>
            </Box>
          </Paper>
        </Fade>
      </Modal>
      <Box
        sx={{
          width: 128,
          height: 128,
          position: "relative",
          zIndex: 9
        }}
      >
        <label htmlFor="icon-button-file">
          <Input
            accept="image/*"
            id="icon-button-file"
            type="file"
            onChange={handleImageSelect}
          />
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
            sx={{
              height: 128,
              width: 128,
              position: "relative",
              "&:hover>div>img": {
                opacity: 0.4
              },
              "&:hover>svg": {
                opacity: 1
              }
            }}
          >
            <PhotoIcon
              sx={{
                position: "absolute",
                height: 32,
                width: 32,
                color: "white",
                zIndex: 9,
                opacity: 0,
                transition: (th) => th.transitions.create("opacity")
              }}
            />
            <Avatar
              variant={variant}
              sx={{
                height: 128,
                width: 128,
                opacity: 1,
                img: {
                  transition: (th) => th.transitions.create("opacity")
                }
              }}
              src={src}
            />
          </IconButton>
        </label>
      </Box>
    </>
  );
};
