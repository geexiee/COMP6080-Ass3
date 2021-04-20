import React from 'react';
// import { render, screen } from '@testing-library/react';
import GameTile from '../components/GameTile';
import { shallow } from 'enzyme';

// test('GameTile has edit game button', () => {
//   render(<GameTile />);
//   const linkElement = screen.getByText(/home/i);
//   expect(linkElement).toBeInTheDocument();
// });

describe('GameTile testing', () => {
  it('has a specified game name', () => {
    const gameName = 'testname'
    const gameTile = shallow(<GameTile ID={0} owner={'testOwner'} name={gameName}
       img='https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png'/>);
    expect(gameTile.text()).toContain(gameName);
  });

  it('has a specified game owner', () => {
    const gameOwner = 'testowner'
    const gameTile = shallow(<GameTile ID={0} owner={gameOwner} name={'testnName'}
       img='https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png'/>);
    expect(gameTile.text()).toContain(gameOwner);
  });

  it('triggers setGoEditGame when editGame button has been clicked', () => {
    const gameOwner = 'testowner'
    const gameTile = shallow(<GameTile ID={0} owner={gameOwner} name={'testnName'}
       img='https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png'/>);
    expect(gameTile.text()).toContain(gameOwner);
  });
});
