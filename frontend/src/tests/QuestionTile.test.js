import React from 'react';
import { shallow } from 'enzyme';
import QuestionTile from '../components/QuestionTile'

const testQuestionDetails = {
  qid: 0,
  question: 'What is calebs favourite food?',
  questionType: 'Single Choice',
  timeLimit: '10',
  points: '10',
  imageURL: '',
  gid: '0',
  videoURL: '',
  answerList: [
    {
      id: 0,
      answer: 'chicken breast'
    },
    {
      id: 1,
      answer: 'beef jerky'
    },
    {
      id: 2,
      answer: 'shark sticks'
    }
  ],
  correctAnsList: [
    0
  ]
}
describe('QuestionTile testing', () => {
  it('has a specified question', () => {
    const questionTile = shallow(<QuestionTile qid={testQuestionDetails.qid} question={testQuestionDetails.question}
     timeLimit={testQuestionDetails.timeLimit} imageURL={testQuestionDetails.imageURL} points={testQuestionDetails.points}
      gid={testQuestionDetails.gid} videoURL={testQuestionDetails.videoURL}/>);
    expect(questionTile.find('#question').prop('children')).toContain(testQuestionDetails.question);
  });

  it('has a specified timelimit', () => {
    const questionTile = shallow(<QuestionTile qid={testQuestionDetails.qid} question={testQuestionDetails.question}
     timeLimit={testQuestionDetails.timeLimit} imageURL={testQuestionDetails.imageURL} points={testQuestionDetails.points}
      gid={testQuestionDetails.gid} videoURL={testQuestionDetails.videoURL}/>);
    expect(questionTile.find('#timeLimit').prop('children')).toContain(testQuestionDetails.timeLimit);
  });

  it('has a specified number of points', () => {
    const questionTile = shallow(<QuestionTile qid={testQuestionDetails.qid} question={testQuestionDetails.question}
     timeLimit={testQuestionDetails.timeLimit} imageURL={testQuestionDetails.imageURL} points={testQuestionDetails.points}
      gid={testQuestionDetails.gid} videoURL={testQuestionDetails.videoURL}/>);
    expect()
    expect(questionTile.find('#points').prop('children')).toContain(testQuestionDetails.points);
  });
});
