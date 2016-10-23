import React from 'react';
import ReactDOM from 'react-dom';

import Voting from './components/Voting';

let votedWith;
const pair = ['Trainspotting', '28 Days Later'];
const vote = (entry) => votedWith = entry;
const winner = 'Trainspotting';

ReactDOM.render(
	<Voting pair={pair} vote={vote} winner={winner} />,
	document.getElementById('app')
);
