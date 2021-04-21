import axios from 'axios';

export const ReadFile = async (file, gid, name) => {
  const reader = new FileReader();
  reader.onload = async (e) => {
    const text = (e.target.result);
    console.log(text, typeof (text));
    const jsonFile = JSON.parse(text);
    console.log(typeof (jsonFile));
    const questions = jsonFile.questions;
    console.log(questions);
    const thumbnail = jsonFile.thumbnail;
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
      alert('successfully added file :^)');
    }
  };
  reader.readAsText(file);
}
