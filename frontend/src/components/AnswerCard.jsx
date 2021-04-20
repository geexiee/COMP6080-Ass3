import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';

const AnswerCard = (props) => {
  const { answer } = props;
  return (
    <Card>
        {answer}
    </Card>
  );
}

AnswerCard.propTypes = {
  answer: PropTypes.string
};

export default AnswerCard;
