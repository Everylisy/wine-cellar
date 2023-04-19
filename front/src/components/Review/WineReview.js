import { useState } from 'react';
import * as Api from '../../api';

import styled from 'styled-components';
import { Button, Input, Rate, message } from 'antd';
import TextArea from 'antd/lib/input/TextArea';

const REVIEW_SCORE_DESC = ['1점', '2점', '3점', '4점', '5점'];
const REVIEW_ERROR_MESSAGE = '폼을 모두 작성해주세요.';

function WineReview({ wineId, setReview }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);
  const [writing, setWriting] = useState(true);

  const reviewFormIsValid = (value) => {
    return value.toString().trim().length > 0;
  };

  const titleIsValid = reviewFormIsValid(title);
  const contentIsValid = reviewFormIsValid(content);
  const ratingIsValid = reviewFormIsValid(rating);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    try {
      if (titleIsValid && contentIsValid && ratingIsValid) {
        const res = await Api.post(`reviews/${wineId}`, {
          title,
          content,
          rating,
        });

        if (!res.ok) {
          throw new Error('HTTP Error');
        }

        setReview(res.data.reviews);
        setWriting(false);
        setTitle('');
        setContent('');
        setRating(0);
      } else {
        message.error(REVIEW_ERROR_MESSAGE);
      }
    } catch (error) {
      console.error(
        'Fetch Error:',
        error instanceof Error ? error.message : error
      );
      throw error;
    }
  };

  const handleActive = () => {
    setWriting(true);
  };

  const handleChange = (value) => {
    setRating(value);
  };

  return (
    <>
      {writing ? (
        <FormWrapper>
          <span>
            <StarLabel>리뷰 남기기 </StarLabel>
            <Rate
              tooltips={REVIEW_SCORE_DESC}
              onChange={handleChange}
              value={rating}
            />
            {rating ? (
              <span className="ant-rate-text">
                {REVIEW_SCORE_DESC[rating - 1]}
              </span>
            ) : null}
          </span>

          <form onSubmit={handleReviewSubmit}>
            <StyledInp
              placeholder="제목을 입력해주세요."
              allowClear
              onChange={(e) => setTitle(e.target.value)}
            />
            <StyledArea
              placeholder="내용을 입력해주세요."
              allowClear
              autoSize={{ minRows: 2, maxRows: 6 }}
              onChange={(e) => setContent(e.target.value)}
            />
            <StyledBtn htmlType="submit">제출</StyledBtn>
          </form>
        </FormWrapper>
      ) : (
        <StyledBtn onClick={handleActive}>리뷰 작성</StyledBtn>
      )}
    </>
  );
}

export default WineReview;

const FormWrapper = styled.div`
  width: 100%;
  align-items: center;
  border-radius: 16px;
  padding: 16px;
`;

const StyledInp = styled(Input)`
  border-radius: 15px;
  margin: 10px 0 10px 0;
`;
const StyledArea = styled(TextArea)`
  border-radius: 15px;
`;

const StyledBtn = styled(Button)`
  font-weight: 400;
  font-size: 14px;
  border-radius: 5px;
  margin-top: 20px;
  margin-right: 15px;
  color: #c365fd;
  &:hover {
    color: #c365fd;
    border-color: #c365fd;
  }
`;

const StarLabel = styled.span`
  color: #ffd32a;
  margin-right: 10px;
  font-size: 16px;
`;
