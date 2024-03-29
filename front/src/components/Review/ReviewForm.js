import { useState, useContext } from 'react';
import { UserStateContext } from '../../App';
import * as Api from '../../api';

import { Collapse, Divider, List } from 'antd';
import WineReview from './WineReview';
import styled from 'styled-components';
import ReviewCard from './ReviewCard';

const { Panel } = Collapse;

function ReviewForm({ wineId }) {
  const [accordion, setAccordion] = useState(false);
  const [review, setReview] = useState([]);

  const userState = useContext(UserStateContext);
  const isLogin = !!userState.user;

  const handleReview = async () => {
    if (isLogin) {
      setAccordion((accordion) => !accordion);
      if (accordion === false) {
        const res = await Api.get(`reviews/wines/${wineId}`);
        setReview(res.data.reviews);
      }
    }
  };

  return (
    <StyledCollapse onChange={handleReview}>
      <Panel header="⭐리뷰 보기 / 작성⭐" key="1" style={{ border: '0' }}>
        {isLogin ? (
          <WineReview wineId={wineId} setReview={setReview} />
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            로그인한 유저만 볼 수 있어요.
          </div>
        )}
        <Divider />
        <List
          itemLayout="horizontal"
          dataSource={review}
          renderItem={(item) => (
            <ReviewCard
              key={item.id}
              title={item.title}
              content={item.content}
              createdAt={item.createdAt}
              rating={item.rating}
            ></ReviewCard>
          )}
        />
      </Panel>
    </StyledCollapse>
  );
}

export default ReviewForm;

const StyledCollapse = styled(Collapse)`
  width: 64%;
  height: auto;
  box-shadow: 0 0 0 1px rgb(87 87 87 / 10%), 0 8px 8px 0 rgb(234 224 218 / 30%);
  border-radius: 0 0 20px 20px;
  border: 0;
  margin-bottom: 30px;
  z-index: 0;
  .ant-collapse-item:last-child > .ant-collapse-content {
    border-radius: 0 0 20px 20px;
  }
`;
