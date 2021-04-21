import axios from 'axios';

export const DeleteQuestion = async (qid, gid) => {
  const questions = [];
  const response = await axios.get(`http://localhost:5005/admin/quiz/${gid}`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }).catch(e => console.log(e.response.data.error));
  if (response !== undefined && response.status === 200) {
    const oldQuestions = response.data.questions;
    const name = response.data.name;
    const thumbnail = response.data.thumbnail;
    oldQuestions.forEach((question) => {
      if (question.id !== qid) {
        if (question.id > qid) {
          question.id -= 1;
        }
        questions.push(question);
      }
    });

    console.log('old list of questions: ', oldQuestions);
    console.log('new list of questions: ', questions);
    // Now we update the quiz so that it doesn't include the deleted question
    await axios.put(`http://localhost:5005/admin/quiz/${gid}`, {
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
      alert('successfully deleted question!');
    }
  }
}
