import React from 'react';
import Button from '@material-ui/core/Button';
import GameTile from '../components/GameTile';
import { shallow } from 'enzyme';

const testQuizDetails = {
  ID: 0,
  name: 'test quiz',
  owner: 'test owner',
  img: 'puppy.jpeg'
}

describe('GameTile testing', () => {
  it('has a specified game name', () => {
    const card = shallow(
    <GameTile
      ID={testQuizDetails.ID}
      name={testQuizDetails.name}
      owner={testQuizDetails.owner}
      img={testQuizDetails.img}
    />
    );
    // check the game name matches the prop
    expect(card.find('#gameName').prop('children')).toContain(testQuizDetails.name);
  });

  it('has a specified game owner', () => {
    const card = shallow(
      <GameTile
        ID={testQuizDetails.ID}
        name={testQuizDetails.name}
        owner={testQuizDetails.owner}
        img={testQuizDetails.img}
      />
    );
    // check game owner is correct
    expect(card.find('#gameOwner').prop('children')).toContain(testQuizDetails.owner);
  });

  it('has a button to edit quiz', () => {
    const card = shallow(
      <GameTile
        ID={testQuizDetails.ID}
        name={testQuizDetails.name}
        owner={testQuizDetails.owner}
        img={testQuizDetails.img}
      />
    );
    // check there exists an edit game button with corresponding text
    expect(card.find(Button).find('.editGameButton').prop('children')).toContain('Edit Game');
  });

  it('has a button to delete quiz', () => {
    const card = shallow(
      <GameTile
        ID={testQuizDetails.ID}
        name={testQuizDetails.name}
        owner={testQuizDetails.owner}
        img={testQuizDetails.img}
      />
    );
    // check there exists an delete game button with corresponding text
    expect(card.find(Button).find('.deleteGameButton').prop('children')).toContain('Delete Game');
  });

  it('opens the game started modal when clicked', () => {
    const card = shallow(
      <GameTile
        ID={testQuizDetails.ID}
        name={testQuizDetails.name}
        owner={testQuizDetails.owner}
        img={testQuizDetails.img}
      />
    );
    // click start game button
    card.find('#startGameButton').simulate('click');
    // check that the game start modal appears
    expect(card.find('#gameModalTitle').prop('children')).toContain('Game Started');
  });
});
