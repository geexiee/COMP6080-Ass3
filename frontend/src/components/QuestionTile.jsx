import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { generatePath } from 'react-router';
import { Redirect } from 'react-router-dom';

const QuestionTile = (props) => {
  const [goEditQuestion, setGoEditQuestion] = React.useState(false);
  const [goDeleteQuestion, setGoDeleteQuestion] = React.useState(false);
  const { qid, question, timeLimit, imageURL, points, gid } = props;

  const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      maxHeight: 140,
    },
  });

  const classes = useStyles();

  if (goEditQuestion) {
    console.log(generatePath('/edit/:gid/:qid', { gid: gid, qid: qid }))
    return <Redirect to={generatePath('/edit/:gid/:qid', { gid: gid, qid: qid })} />
  }

  // TODO: implement deleting question
  if (goDeleteQuestion) {
    console.log('trying to delete q');
  }

  return (
    <Card variant="outlined" className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={imageURL}
          title="Question"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Question {qid}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            question: {question} timelimit: {timeLimit} points: {points}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" variant="contained" color="primary" onClick={() => setGoEditQuestion(true)}>
          Edit
        </Button>
        <Button size="small" variant="contained" color="secondary" onClick={() => setGoDeleteQuestion(true)}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}

QuestionTile.propTypes = {
  qid: PropTypes.number,
  question: PropTypes.string,
  timeLimit: PropTypes.string,
  imageURL: PropTypes.string,
  videoURL: PropTypes.string,
  points: PropTypes.string,
  gid: PropTypes.string
};

export default QuestionTile;
