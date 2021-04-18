/*
 For a given data structure of a question, produce another
 object that doesn't contain any important meta data (e.g. the answer)
 to return to a "player"
*/
export const quizQuestionPublicReturn = question => {
  console.log('See question: ', question);
  publicQuestion = {
    id: question.id,
    question: question.question,
    questionType: question.questionType,
    timeLimit: question.timeLimit,
    points: question.points,
    imageURL: question.imageURL,
    videoURL: question.videoURL,
    answerList: question.answerList, // this is the list of ALL answers 
  }
  return publicQuestion;
};

/*
 For a given data structure of a question, get the IDs of
 the correct answers (minimum 1).
*/
export const quizQuestionGetCorrectAnswers = question => {
  return question.correctAnsList; // array of correct answer IDs
};

/*
 For a given data structure of a question, get the IDs of
 all of the answers, correct or incorrect.
*/
export const quizQuestionGetAnswers = question => {
  return question.answerList; // array of ALL answers
};

/*
 For a given data structure of a question, get the duration
 of the question once it starts. (Seconds)
*/
export const quizQuestionGetDuration = question => {
  return question.timeLimit;
};
