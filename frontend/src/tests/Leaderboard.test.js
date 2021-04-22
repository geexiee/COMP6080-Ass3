import React from 'react';
import Leaderboard from '../components/Leaderboard';
import { shallow } from 'enzyme';

const testLeaderboardData = {
  data: [['Amy', 2], ['John', 1], ['James', 1]]
}

describe('Leaderboard testing', () => {
  it('has a rank column', () => {
    const table = shallow(<Leaderboard data={testLeaderboardData.data} />);
    // check rank heading exists
    console.log(table.find('#table-row').prop('children'));
    console.log(table.find('#table-row').prop('children'));
    expect(table.find('#table-row').exists('#rank'));
  });

  it('has a name column', () => {
    const table = shallow(<Leaderboard data={testLeaderboardData.data} />);
    // check name heading exists
    expect(table.find('#table-row').exists('#name'));
  });

  it('has a score column', () => {
    const table = shallow(<Leaderboard data={testLeaderboardData.data} />);
    // check score heading exists
    expect(table.find('#table-row').exists('#score'));
  });

  it('has a specified game owner', () => {
    const table = shallow(<Leaderboard data={testLeaderboardData.data} />);
    // check number of rows
    expect(table.find('.row').length).toBe(3);
  });
});
