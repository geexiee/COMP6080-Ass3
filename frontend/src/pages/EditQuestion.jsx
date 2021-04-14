import React from 'react';
import { useParams } from 'react-router';
import { TextField, FormLabel, RadioGroup, FormControlLabel, Radio, FormControl, Input, InputLabel, Button } from '@material-ui/core';
import axios from 'axios';
import Header from '../components/Header.jsx';

const EditQuestion = () => {
  const params = useParams();
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
  const oldQuestionIdList = [];
  const answerList = [];

  const submitQuestion = async (question, questionType, timeLimit, points, image, videoURL) => {
    // generating list of answers and checking for valid input
    // TODO: SIMPLIFY IF POSSIBLE
    if (answer1 !== '') {
      const newID = answerList.length;
      const answerObject = {
        id: newID,
        answer: answer1
      };
      answerList.push(answerObject);
    }
    if (answer2 !== '') {
      const newID = answerList.length;
      const answerObject = {
        id: newID,
        answer: answer2
      };
      answerList.push(answerObject);
    }
    if (answer3 !== '') {
      const newID = answerList.length;
      const answerObject = {
        id: newID,
        answer: answer3
      };
      answerList.push(answerObject);
    }
    if (answer4 !== '') {
      const newID = answerList.length;
      const answerObject = {
        id: newID,
        answer: answer4
      };
      answerList.push(answerObject);
    }
    if (answer5 !== '') {
      const newID = answerList.length;
      const answerObject = {
        id: newID,
        answer: answer5
      };
      answerList.push(answerObject);
    }
    if (answer6 !== '') {
      const newID = answerList.length;
      const answerObject = {
        id: newID,
        answer: answer5
      };
      answerList.push(answerObject);
    }
    if (answerList.length < 2) {
      alert('Please enter at least 2 answers :(');
      return
    }
    if (question === '') {
      alert('please enter a question :(');
      return;
    }
    if (questionType === '') {
      alert('please enter a question type :(');
      return;
    }
    if (timeLimit === '') {
      alert('please enter a time limit :(');
      return;
    }
    if (points === '') {
      alert('please enter points :(');
      return;
    }

    // Fetch current quiz data so we can add the new question
    const response = await axios.get(`http://localhost:5005/admin/quiz/${params.gid}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).catch(e => console.log(e.response.data.error));
    if (response !== undefined && response.status === 200) {
      console.log('Fetching current quiz data!');
      const questions = response.data.questions;
      const name = response.data.name;
      const thumbnail = response.data.thumbnail;
      questions.map((question) => {
        if (question.id != null) {
          oldQuestionIdList.push(question.id); // generating list of existing question ids
        }
        return 0;
      });
      console.log('old id list is: ', oldQuestionIdList);
      // const newID = Math.max(...oldQuestionIdList) + 1; // generating a unique id for the new question TODO: generate ids better
      const newID = oldQuestionIdList.length + 1; // Math.max([]) = -Infinity  {math.max of empty array == -infinity}
      console.log('Newest ID is: ', newID);
      const newQuestionBody = {
        id: newID,
        question: question,
        timeLimit: timeLimit,
        points: points,
        imageURL: image,
        videoURL: videoURL,
        answerList: answerList
        // TODO: add allAnswers, correctAnswers
      }
      console.log('old list of questions: ', questions)
      questions.push(newQuestionBody); // Adding the new question to the old list of qs
      console.log('new list of questions: ', questions);
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
        console.log('successfully added question!');
      }
    }
  }

  // TODO: add a way for the user to mark correct answers, can indicate correct through either another list of correct answers or adding a field to answerobject
  return (
    <div className="EditQuestionForm">
      <Header />
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
            <p>Answer Options</p>
            <TextField id="answer1" label="Answer 1" required onInput={ e => setAnswer1(e.target.value)}></TextField>
            <TextField id="answer2" label="Answer 2" required onInput={ e => setAnswer2(e.target.value)}></TextField>
            <TextField id="answer3" label="Answer 3" onInput={ e => setAnswer3(e.target.value)}></TextField>
            <TextField id="answer4" label="Answer 4" onInput={ e => setAnswer4(e.target.value)}></TextField>
            <TextField id="answer5" label="Answer 5" onInput={ e => setAnswer5(e.target.value)}></TextField>
            <TextField id="answer6" label="Answer 6" onInput={ e => setAnswer6(e.target.value)}></TextField>
          </FormControl>
          <Button variant="contained" color="primary" onClick={() => submitQuestion(question, questionType, timeLimit, points, image, videoURL)}>Submit</Button>
        </FormControl>
      </form>
    </div>
  );
};

export default EditQuestion;
// THIS IS ALL JUST DUMMY DATA TO MANUALLY PUT IN THE API FOR TESTING
// {
//   "questions": [
//     {
//       "id": 0,
//       "question": "What is my dogs name?",
//       "timeLimit": "10",
//       "points": "10",
//       "imageURL": "",
//       "videoURL": "",
//       "answerList": [
//         {
//           "id": 0,
//           "answer": "caleb"
//         },
//         {
//           "id": 1,
//           "answer": "caneb"
//         }
//       ]
//     },
//     {
//       "id": 1,
//       "question": "What is my cats name?",
//       "timeLimit": "10",
//       "points": "10",
//       "imageURL": "",
//       "videoURL": "",
//       "answerList": [
//         {
//           "id": 0,
//           "answer": "kitty"
//         },
//         {
//           "id": 1,
//           "answer": "kat"
//         }
//       ]
//     }
//   ],
//   "name": "My first quiz",
//   "thumbnail": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="
// }
