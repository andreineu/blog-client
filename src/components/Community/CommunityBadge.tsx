import { Avatar, Skeleton } from "@mui/material";
import { CommunityBase } from "../../generated/graphql";
import Link from "../Link";

interface CommunityBadgeProps {
  community: CommunityBase;
}

export const CommunityBadge: React.FC<CommunityBadgeProps> = ({
  community
}) => {
  let status = "";
  if (status === "loading") return <Skeleton width={100} />;
  return (
    <>
      <Avatar
        sx={{ width: 32, height: 32, ml: 3 }}
        src={community.avatar || ""}
      />
      <Link
        href={`/community/${community?.name}`}
        color="text.secondary"
        sx={{
          fontSize: 14,
          cursor: "pointer",
          "&:hover": {
            textDecoration: "underline"
          }
        }}
      >
        {community?.name}
      </Link>
    </>
  );
};
