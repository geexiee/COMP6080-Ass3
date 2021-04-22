import React, { useEffect } from 'react';
import { useParams, generatePath } from 'react-router';
import { Redirect } from 'react-router-dom';
import { Select, Checkbox, TextField, FormLabel, RadioGroup, FormControlLabel, Radio, FormControl, Input, InputLabel, Button } from '@material-ui/core';
import axios from 'axios';
import Header from '../components/Header.jsx';
import uuid from 'react-uuid';

// Edit Question page function
const EditQuestion = () => {
  const params = useParams();
  const [goBack, setGoBack] = React.useState(false);
  const [question, setQuestion] = React.useState('');
  const [questionType, setQuestionType] = React.useState('');
  const [timeLimit, setTimeLimit] = React.useState(-1);
  const [points, setPoints] = React.useState(-1);
  const [image, setImage] = React.useState('');
  const [videoURL, setVideoURL] = React.useState('');
  const [answer1, setAnswer1] = React.useState('');
  const [answer2, setAnswer2] = React.useState('');
  const [answer3, setAnswer3] = React.useState('');
  const [answer4, setAnswer4] = React.useState('');
  const [answer5, setAnswer5] = React.useState('');
  const [answer6, setAnswer6] = React.useState('');
  const [numAnswers, setNumAnswers] = React.useState(2);
  const [checked1, setchecked1] = React.useState(false);
  const [checked2, setchecked2] = React.useState(false);
  const [checked3, setchecked3] = React.useState(false);
  const [checked4, setchecked4] = React.useState(false);
  const [checked5, setchecked5] = React.useState(false);
  const [checked6, setchecked6] = React.useState(false);
  const answerList = [];
  const correctAnsList = [];
  const [previousQuestion, setPreviousQuestion] = React.useState('');

  const handleNumAnschange = (event) => {
    setNumAnswers(event.target.value)
  };

  const check1 = () => {
    checked1 ? setchecked1(false) : setchecked1(true);
  }

  const check2 = () => {
    checked2 ? setchecked2(false) : setchecked2(true);
  }

  const check3 = () => {
    checked3 ? setchecked3(false) : setchecked3(true);
  }

  const check4 = () => {
    checked4 ? setchecked4(false) : setchecked4(true);
  }

  const check5 = () => {
    checked5 ? setchecked5(false) : setchecked5(true);
  }

  const check6 = () => {
    checked6 ? setchecked6(false) : setchecked6(true);
  }

  const getQuestion = (gid, qid) => {
    const response = axios.get(`http://localhost:5005/admin/quiz/${gid}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).catch(e => console.log(e.response.data.error));
    if (response !== undefined && response.status === 200) {
      console.log('hey');
      console.log(response.data.questions);
      response.data.questions.forEach((question) => {
        if (question.id === Number(qid)) {
          setPreviousQuestion(question);
          console.log(question);
        }
      });
      if (previousQuestion === '') {
        alert('something went wrong, could not find the correct question id');
      }
    }
  }

  const submitQuestion = async (question, questionType, timeLimit, points, image, videoURL) => {
    // generating list of answers and checking for valid input
    // TODO: SIMPLIFY IF POSSIBLE
    if (answer1 !== '') {
      const answerObject = {
        id: uuid(),
        answer: answer1
      };
      answerList.push(answerObject);
      if (checked1) {
        correctAnsList.push(answerObject.id);
      }
    }
    if (answer2 !== '') {
      const answerObject = {
        id: uuid(),
        answer: answer2
      };
      answerList.push(answerObject);
      if (checked2) {
        correctAnsList.push(answerObject.id);
      }
    }
    if (answer3 !== '') {
      const answerObject = {
        id: uuid(),
        answer: answer3
      };
      answerList.push(answerObject);
      if (checked3) {
        correctAnsList.push(answerObject.id);
      }
    }
    if (answer4 !== '') {
      const answerObject = {
        id: uuid(),
        answer: answer4
      };
      answerList.push(answerObject);
      if (checked4) {
        correctAnsList.push(answerObject.id);
      }
    }
    if (answer5 !== '') {
      const answerObject = {
        id: uuid(),
        answer: answer5
      };
      answerList.push(answerObject);
      if (checked5) {
        correctAnsList.push(answerObject.id);
      }
    }
    if (answer6 !== '') {
      const answerObject = {
        id: uuid(),
        answer: answer5
      };
      answerList.push(answerObject);
      if (checked6) {
        correctAnsList.push(answerObject.id);
      }
    }

    // Validation Checks
    if (answerList.length < 2) {
      alert('Please enter at least 2 answers :(');
      return;
    }
    if (question === '') {
      alert('please enter a question :(');
      return;
    }
    if (questionType === '') {
      alert('please enter a question type :(');
      return;
    }
    if (timeLimit === '' || timeLimit < 1) {
      alert('please enter a valid time limit :(');
      return;
    }
    if (points === '' || points < 1) {
      alert('please enter a valid number of points :(');
      return;
    }

    // Validating that the correct question type has been chosen
    if (questionType === 'Multiple Choice' && correctAnsList.length <= 1) {
      alert('please select more than one correct answer :(');
      return;
    }
    if (questionType === 'Single Choice' && correctAnsList.length !== 1) {
      alert('please ensure you have chosen exactly 1 correct answer :(')
      return;
    }

    // Fetch current quiz data so we can edit the current question
    const response = await axios.get(`http://localhost:5005/admin/quiz/${params.gid}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).catch(e => console.log(e.response.data.error));
    if (response !== undefined && response.status === 200) {
      const questions = response.data.questions;
      const name = response.data.name;
      const thumbnail = response.data.thumbnail;
      let currentQuestion = -1;
      let currentIndex = -1;
      questions.map((question, index) => {
        if (question.id === Number(params.qid)) {
          currentQuestion = question;
          currentIndex = index;
        }
        return 0;
      });
      const newQuestionBody = {
        id: Number(currentQuestion.id),
        question: question,
        questionType: questionType,
        timeLimit: timeLimit,
        points: points,
        imageURL: image,
        videoURL: videoURL,
        answerList: answerList,
        correctAnsList: correctAnsList
      }
      questions.splice(currentIndex, 1, newQuestionBody);
      // Now that we have the current quiz data, we can update the quiz
      await axios.put(`http://localhost:5005/admin/quiz/${params.gid}`, {
        questions,
        name,
        thumbnail
      },
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }).catch(e => console.log(e.response.data.error));
      if (response !== undefined && response.status === 200) {
        alert('successfully edited question :^D');
        setGoBack(true);
      }
    }
  }

  useEffect(() => {
    getQuestion(params.gid, params.qid);
  }, []);

  if (goBack) {
    return <Redirect to={generatePath('/edit/:gid', { gid: params.gid })} />
  }

  // TODO: add a way for the user to mark correct answers, can indicate correct through either another list of correct answers or adding a field to answerobject
  return (
    <div>
      <Header />
      <div className="PageBody">
        <form>
          <h2>Edit Question</h2>
          <p>Game ID: {params.gid}</p>
          <p>Question ID: {params.qid}</p>
          <FormControl>
            <FormControl>
              <TextField label="Question" required onInput={ e => setQuestion(e.target.value)}></TextField>
              <FormLabel required>Question Type</FormLabel>
              <RadioGroup aria-label="Question Type" name="questionType" onInput={ e => setQuestionType(e.target.value)}>
                <FormControlLabel value="Multiple Choice" control={<Radio />} label="Multiple Choice" />
                <FormControlLabel value="Single Choice" control={<Radio />} label="Single Choice" />
              </RadioGroup>
              <TextField id="timeLimit" type="number" label="Time Limit (s)" required onInput={ e => setTimeLimit(e.target.value)}></TextField>
              <TextField id="points" type="number" label="Points" required onInput={ e => setPoints(e.target.value)}></TextField>
              <p>Image</p>
              <Input type="file" label="Image" onInput={ e => setImage(e.target.value)}></Input>
            </FormControl>
            <FormControl>
              <InputLabel>Video URL</InputLabel>
              <Input onInput={ e => setVideoURL(e.target.value)}></Input>
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="age-native-simple">Number of Answers</InputLabel>
              <Select
              native
              value={numAnswers}
              onChange={handleNumAnschange}
              inputProps={{
                name: 'age',
                id: 'age-native-simple',
              }}
              >
                <option aria-label="None" value="" />
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
            </Select>
              <p>Answer Options</p>
              <div>
                <TextField id="answer1" label="Answer 1" required onInput={ e => setAnswer1(e.target.value)}></TextField>
                <FormControlLabel
                  control={<Checkbox onChange={check1}/>}
                  label="Correct"
                />
              </div>
              <div>
                <TextField id="answer2" label="Answer 2" required onInput={ e => setAnswer2(e.target.value)}></TextField>
                <FormControlLabel
                  control={<Checkbox onChange={check2}/>}
                  label="Correct"
                />
              </div>
              {numAnswers > 2 &&
              <div>
                <TextField id="answer3" label="Answer 3" onInput={ e => setAnswer3(e.target.value)}></TextField>
                <FormControlLabel
                  control={<Checkbox onChange={check3}/>}
                  label="Correct"
                />
              </div>}
              {numAnswers > 3 &&
              <div>
                <TextField id="answer4" label="Answer 4" onInput={ e => setAnswer4(e.target.value)}></TextField>
                <FormControlLabel
                  control={<Checkbox onChange={check4}/>}
                  label="Correct"
                />
              </div>}
              {numAnswers > 4 &&
              <div>
                <TextField id="answer5" label="Answer 5" onInput={ e => setAnswer5(e.target.value)}></TextField>
                <FormControlLabel
                  control={<Checkbox onChange={check5}/>}
                  label="Correct"
                />
              </div>}
              {numAnswers > 5 &&
              <div>
                <TextField id="answer6" label="Answer 6" onInput={ e => setAnswer6(e.target.value)}></TextField>
                <FormControlLabel
                  control={<Checkbox onChange={check6}/>}
                  label="Correct"
                />
              </div>}
            </FormControl>
            <Button variant="contained" color="primary" onClick={() => submitQuestion(question, questionType, timeLimit, points, image, videoURL)}>Submit</Button>
          </FormControl>
        </form>
      </div>
    </div>
  );
};

export default EditQuestion;
