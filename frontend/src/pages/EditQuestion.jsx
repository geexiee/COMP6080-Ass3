import React from 'react';
import { useParams } from 'react-router';
import Header from '../components/Header.jsx';

const EditQuestion = () => {
  const params = useParams();
  return (
    <div>
      <Header />
      <h2>Edit Question</h2>
      <p>Game ID: {params.gid}</p>
      <p>Question ID: {params.qid}</p>
      <p>Question Type:&nbsp;
        <input type="radio" id="multiple" name="question-type" value="multiple" />
        <label htmlFor="multiple">&nbsp;Multiple Choice</label>&nbsp;
        <input type="radio" id="single" name="question-type" value="single" />
        <label htmlFor="single">&nbsp;Single Choice</label><br />
      </p>
      <p>Question: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" id="question" /></p>
      <p>Time Limit (s): <input type="number" id="limit" /></p>
      <p>Points:
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <input type="number" id="points" />
      </p>
      <p>Attach URL/Upload photo (optional): <input type="file" id="file" /></p>
      <p>Response choices (2-6):       <input type="text" id="answers" /></p>
      <p># get question deets with /admin/quiz/{params.gid}</p>
      <p># push new question deets with /admin/quiz/{params.gid}</p>
      <p>Returns</p>
      <ul>
        <li>questions</li>
        <li>created time</li>
        <li>name</li>
        <li>thumbnail</li>
        <li>owner</li>
        <li>active (boolean)</li>
        <li>old sessions</li>
      </ul>
      <p>SPEC: Editable items on this page include</p>
      <ul>
        <li>question type (multiple choice, single choice)</li>
        <li>question itself (as a string)</li>
        <li>time limit users have to answer the question</li>
        <li>points for how much the question is worth</li>
        <li>the ability to optionally attach a URL to a youtube video/upload a photo to enhance the question being asked</li>
        <li>anywhere between 2 and 6 answers, that each contain the answer as a string</li>
      </ul>
    </div>
  );
}

export default EditQuestion;
