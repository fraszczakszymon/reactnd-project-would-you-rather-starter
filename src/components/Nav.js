import React from 'react';
import { NavLink } from 'react-router-dom';
import UserProfile from './UserProfile';

export default function Nav() {
  return (
    <nav className='nav'>
      <ul>
        <li>
          <NavLink to='/' exact activeClassName='active'>Home</NavLink>
        </li>
        <li>
          <NavLink to='/add' exact activeClassName='active'>New Question</NavLink>
        </li>
        <li>
          <NavLink to='/leaderboard' exact activeClassName='active'>Leaderboard</NavLink>
        </li>
      </ul>
      <UserProfile />
    </nav>
  );
}
