import axios from 'axios';

export const ReadFile = async (file, gid, name) => {
  const reader = new FileReader();
  reader.onload = async (e) => {
    const text = (e.target.result);
    const jsonFile = JSON.parse(text);
    const questions = jsonFile.questions;
    const thumbnail = jsonFile.thumbnail;
    questions.forEach((question, index) => {
      question.id = index;
    });
    const response = await axios.put(`http://localhost:5005/admin/quiz/${gid}`, {
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
      alert('successfully created quiz with a file');
    }
  };
  reader.readAsText(file);
}
