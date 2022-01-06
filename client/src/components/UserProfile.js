import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { color, device, radius, boxShadow } from "../styles";
import Button from "./Button";

const UserProfileContainer = styled.div`
  position: relative;
  top: -1rem;
  width: 100%; /* 임시 */
  min-width: 300px; /* 임시 */
  max-width: 400px; /* 임시 */
  padding: 1rem;
  margin: 0 auto;
  border-radius: ${radius};
  background-color: ${color.white};
  box-shadow: ${boxShadow};
  word-break: keep-all;

  @media ${device.laptop} {
    top: 0;
  }
`;

const UserNameContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > div {
    display: flex;
    gap: 1rem;
  }
`;

const MainBadgeImg = styled.img``;

const UserProfileLowContainer = styled.div`
  display: flex;
  justify-content: space-between;

`;

const UserProfile = ({ userInfo, successCounts }) => {
  const navigate = useNavigate();

  return (
    <UserProfileContainer>
      <UserNameContainer>
        <div>
          <MainBadgeImg badgeId={userInfo.badge_id} alt="대표뱃지" />
          <h3>{userInfo.username}</h3>
        </div>
        <Button
          width="20px"
          height="20px"
          content="  "
          handler={() => navigate("/editmyinfo")}
        />
      </UserNameContainer>
      <p>{userInfo.bio}</p>
      <UserProfileLowContainer>
        <div>모은 뱃지 {userInfo.badges.length}개</div>
        <div>성공한 챌린지 : {successCounts}개</div>
      </UserProfileLowContainer>
    </UserProfileContainer>
  );
};

export default UserProfile;
