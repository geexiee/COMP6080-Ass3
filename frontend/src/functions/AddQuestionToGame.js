import axios from 'axios';

export const AddQuestionToGame = async (gid, question, questionType, timeLimit, points, image, videoURL, answerList, correctAnsList, setGoBack) => {
  const oldQuestionIdList = [];
  // Fetch current quiz data so we can add the new question
  let response = await axios.get(`http://localhost:5005/admin/quiz/${gid}`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }).catch(e => console.log(e.response.data.error));
  if (response !== undefined && response.status === 200) {
    const questions = response.data.questions;
    const name = response.data.name;
    const thumbnail = response.data.thumbnail;
    questions.map((question) => {
      if (question.id != null) {
        oldQuestionIdList.push(question.id); // generating list of existing question ids
      }
      return 0;
    });
    const newID = oldQuestionIdList.length;
    const newQuestionBody = {
      id: newID,
      question: question,
      questionType: questionType,
      timeLimit: timeLimit,
      points: points,
      imageURL: image,
      videoURL: videoURL,
      answerList: answerList,
      correctAnsList: correctAnsList
    }
    console.log('old list of questions: ', questions)
    questions.push(newQuestionBody); // Adding the new question to the old list of qs
    console.log('new list of questions: ', questions);
    // Now that we have the current quiz data, we can update the quiz
    response = await axios.put(`http://localhost:5005/admin/quiz/${gid}`, {
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
      alert('successfully added question :~D');
      setGoBack(true);
    }
  }
}
