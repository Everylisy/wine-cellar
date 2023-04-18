import { useEffect, useState } from 'react';

import styled from 'styled-components';
import { BackTop, Card, Image } from 'antd';
import BookmarkButton from '../bookmark/BookmarkButton';
import ReviewForm from '../Review/ReviewForm';
import WineChart from './WineChart';
import Rating from '../SearchWine/Rating';

function Result({
  wineId,
  nation,
  title,
  type,
  local,
  price,
  ImageURL,
  abv,
  varieties,
  bookmarked,
  sweet,
  acidity,
  body,
  tannin,
  bookmarkList,
  setBookmarkList,
}) {
  const isResultPage = true;
  const [isBookmarked, setIsBookmarked] = useState(bookmarked);
  const [rating, setRatingVal] = useState(0);
  const [ratingCnt, setRatingCnt] = useState(0);

  useEffect(() => {
    setIsBookmarked(bookmarked);
  }, [bookmarked]);

  return (
    <>
      <Container>
        <WineChart
          sweet={sweet}
          acidity={acidity}
          body={body}
          tannin={tannin}
        />
        <StyledCard>
          <BookmarkButton
            isResultPage={isResultPage}
            isBookmarked={isBookmarked}
            setIsBookmarked={setIsBookmarked}
            wineId={wineId}
            bookmarkList={bookmarkList}
            setBookmarkList={setBookmarkList}
          />
          <ContentWrapper>
            <BottleImg>
              <WineImg width={150} src={'https://' + ImageURL} />
            </BottleImg>
            <InfoColumn>
              <WineInfo>
                <WineInfoVintage>
                  <WineTitle>{title}</WineTitle>
                  <WineType>와인타입: {type}</WineType>
                </WineInfoVintage>
                <WineNation>
                  {nation}, {local}
                </WineNation>
              </WineInfo>
              <VarietyWrapper>
                <VarietyInfo>품종 : {varieties}</VarietyInfo>
              </VarietyWrapper>
            </InfoColumn>
            <RatingWrapper>
              <Rating
                wineId={wineId}
                rating={rating}
                ratingCnt={ratingCnt}
                setRatingVal={setRatingVal}
                setRatingCnt={setRatingCnt}
              />
              {price === 0 ? (
                <RatingPrice>가격 정보가 없습니다</RatingPrice>
              ) : (
                <RatingPrice>가격: \{price}</RatingPrice>
              )}
            </RatingWrapper>
          </ContentWrapper>
        </StyledCard>
      </Container>
      <ReviewForm
        wineId={wineId}
        rating={rating}
        ratingCnt={ratingCnt}
        setRatingVal={setRatingVal}
        setRatingCnt={setRatingCnt}
      ></ReviewForm>
      <BackTop />
    </>
  );
}

export default Result;

const Container = styled.div`
  &:first-child {
    margin-top: 60px;
  }
`;

const StyledCard = styled(Card)`
  width: 64%;
  height: auto;
  box-shadow: 0 0 0 1px rgb(87 87 87 / 10%), 0 8px 8px 0 rgb(234 224 218 / 30%);
  border-radius: 20px 20px 0 0;
  border: 0;
  z-index: 0;
  .ant-card-body {
    padding: 16px;
  }
`;

const ContentWrapper = styled.div`
  z-index: 10;
  display: flex;
  flex-direction: row;
  padding-bottom: 16px;
`;

const BottleImg = styled.div`
  flex: 0 0 20%;
`;

const WineImg = styled(Image)`
  border-radius: 5px;
`;

const InfoColumn = styled.div`
  flex: 1 1 55%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 16px;
  height: 200px;
`;

const RatingWrapper = styled.div`
  flex: 0 0 25%;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
`;

const RatingPrice = styled.div`
  color: #10ac84;
  font-size: 16px;
  line-height: 20px;
  font-weight: 400;
  display: block;
  text-align: center;
  padding: 8px 0 0;
`;

const WineInfo = styled.div`
  padding: 8px;
  box-sizing: inherit;
`;

const WineInfoVintage = styled.div`
  line-height: 28px;
  padding-bottom: 8px;
  display: block;
  color: #1e1e1e;
  background-color: transparent;
  text-align: left;
  line-height: 24px;
  font-weight: 400;
`;

const WineTitle = styled.div`
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  color: #1e1e1e;
  text-align: left;
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const WineType = styled.div`
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  color: #1e1e1e;
  text-align: left;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
`;

const WineNation = styled.div`
  text-align: left;
  font-size: 14px;
  color: grey;
  padding-bottom: 8px;
`;

const VarietyWrapper = styled.div`
  display: flex;
  margin: 0 0 0 -16px;
  padding: 16px 24px;
  border-radius: 16px;
  background-color: #fafafa;
`;

const VarietyInfo = styled.div`
  margin-left: 8px;
  color: #1e1e1e;
  text-align: left;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
`;
