import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserinfo } from "../actions";
import { requestMyinfo } from "../apis";
import styled from "styled-components";
import { color, device, contentWidth } from "../styles";
import Illust from "../components/Illust";
import UserProfile from "../components/UserProfile";
import Tab from "../components/Tab";
import ChallengeCard from "../components/ChallengeCard";
// import { dummyUserInfo } from "../data/dummyUserInfo";

const MypageContainer = styled.div`
  background-color: ${color.primaryLight};

  @media ${device.laptop} {
    height: 100vh;
    max-width: ${contentWidth};
    margin: 0 auto;
    display: flex;
  }
`;

const MyChallengesContainer = styled.section`
  height: 70vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`

const ChallengeListContainer = styled.div`
  padding: 1rem;
  margin: 0 auto;

  @media ${device.laptop} {
    padding: 1rem 0;
    width: calc(${contentWidth} * 1 / 3);
  }
`;

const ChallengeList = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  text-align: center;
  font-weight: bold;

  @media ${device.mobileLandscape} {
    grid-template-columns: repeat(2, 1fr);
  }
  @media ${device.laptop} {
    grid-template-columns: 1fr;
  }
`;

const EmptyMessage = styled.p`
  color: ${color.primary};
  font-size: 3rem;
  text-align: center;
  word-break: keep-all;
`;

const Mypage = () => {
  const [view, setView] = useState("ongoing");
  const [challenges, setChallenges] = useState([{}])
  const state = useSelector((state) => state.userReducer);
  const myinfo = state.userInfo
  const dispatch = useDispatch();

  useEffect(() => {
    requestMyinfo("1").then(result => {
      setChallenges(result.challenge_info.challenges)
      dispatch(updateUserinfo({
        username: result.user_info.username,
        bio: result.user_info.bio,
        badgeId: result.user_info.badge_id,
        badges: result.user_info.badges,            
    }))
  })
  // eslint-disable-next-line
  }, [])

  // const ongoingChallenges = dummyUserInfo.challenge_info.filter(el => el.is_finished === false)
  // const finishedChallenges = dummyUserInfo.challenge_info.filter(el => el.is_finished === true)

  // const successCounts = dummyUserInfo.challenge_info
  //                         .filter(el => el.is_finished === true && el.is_accomplished === true).length
  const ongoingChallenges = challenges.filter(el => el.is_finished === false)
  const finishedChallenges = challenges.filter(el => el.is_finished === true)

  const successCounts = challenges
                          .filter(el => el.is_finished === true && el.is_accomplished === true).length

  const tabContent = {
    ongoing: (
      <>
        {ongoingChallenges.length === 0 ?
          <EmptyMessage>
            참여중인<br />챌린지가<br />없습니다
          </EmptyMessage>
          :
          <ChallengeList> 
            {ongoingChallenges.map((el) => (
              <ChallengeCard 
                challenge={el}
                key={el.challenge_id}  
              />              
            ))}
          </ChallengeList>
        }
      </>
    ),
    finished: (
      <>
        {finishedChallenges.length === 0 ?
          <EmptyMessage>
            완료된<br />챌린지가<br />없습니다
          </EmptyMessage>
          :
          <ChallengeList> 
            {finishedChallenges.map((el) => (
              <ChallengeCard 
                challenge={el}
                key={el.challenge_id}  
              />              
            ))}
          </ChallengeList>
        }
      </>
    ),
  };

  return (
    <MypageContainer>
      <Illust />
      <MyChallengesContainer>
        <UserProfile
          userInfo={myinfo}
          successCounts={successCounts}
        />
        <Tab
          tabInfo={[
            ["ongoing", "참여중인 챌린지"],
            ["finished", "완료된 챌린지"],
          ]}
          handleView={setView}
        />
        <ChallengeListContainer>
          {tabContent[view]}    
        </ChallengeListContainer>
      </MyChallengesContainer>
    </MypageContainer>
  );
};

export default Mypage;
