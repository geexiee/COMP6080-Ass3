import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';

const GameTile = (props) => {
  const { ID, name, owner, img } = props;
  // const [quizInfo, setQuizInfo] = React.useState([]);
  // const GetQuizInfo = async () => {
  //   const response = await axios.get(`http://localhost:5005/admin/quiz?quizid=${ID}`, {
  //     headers: {
  //       Accept: 'application/json',
  //       Authorization: `Bearer ${localStorage.getItem('token')}`
  //     }
  //   }).catch(e => console.log(e.response.data.error));
  //   if (response !== undefined && response.status === 200) {
  //     const quizInfo = response.data.quizzes;
  //     setQuizInfo(quizInfo);
  //   }
  // }

  // useEffect(() => {
  //   GetQuizInfo();
  // }, []);

  return (
    <Card border='primary' className="GameTile">
      <Card.Body>
        <Card.Title>Game ID: {ID}</Card.Title>
        <Card.Subtitle className="GameName">Game Name: {name}</Card.Subtitle>
        <Card.Text>
          Owner: {owner}
        </Card.Text>
        <Button className="CardButton" onClick={() => console.log(ID)}>Edit Game</Button>
        <Button className="CardButton" >Start Game</Button>
      </Card.Body>
      <Card.Img variant='bottom' src={img}/>
    </Card>
  );
}

GameTile.propTypes = {
  ID: PropTypes.string,
  name: PropTypes.string,
  owner: PropTypes.string,
  img: PropTypes.img
};

export default GameTile;
