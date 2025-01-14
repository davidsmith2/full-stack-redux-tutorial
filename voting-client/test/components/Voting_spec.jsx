import React from 'react';
import ReactDOM from 'react-dom';
import {
	renderIntoDocument,
	scryRenderedDOMComponentsWithTag,
	Simulate
} from 'react-addons-test-utils';
import {expect} from 'chai';
import {List} from 'immutable';

import {Voting} from '../../src/components/Voting';

describe('Voting', () => {

	it('renders a pair of buttons', () => {
		const component = renderIntoDocument(
			<Voting pair={['Trainspotting', '28 Days Later']} />
		);
		const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
		expect(buttons.length).to.equal(2);
		expect(buttons[0].textContent).to.equal('Trainspotting');
		expect(buttons[1].textContent).to.equal('28 Days Later');
	});

	it('invokes callback when a button is clicked', () => {
		let votedWith;
		const vote = (entry) => votedWith = entry;
		const component = renderIntoDocument(
			<Voting pair={['Trainspotting', '28 Days Later']} vote={vote} />
		);
		const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
		Simulate.click(buttons[0]);
		expect(votedWith).to.equal('Trainspotting');
	});

	it('disables buttons when the user has voted', () => {
		const component = renderIntoDocument(
			<Voting pair={['Trainspotting', '28 Days Later']} hasVoted="Trainspotting" />
		);
		const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
		expect(buttons.length).to.equal(2);
		expect(buttons[0].hasAttribute('disabled')).to.equal(true);
		expect(buttons[1].hasAttribute('disabled')).to.equal(true);

	});

	it('adds a label to the voted-for entry', () => {
		const component = renderIntoDocument(
			<Voting pair={['Trainspotting', '28 Days Later']} hasVoted="Trainspotting" />
		);
		const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
		expect(buttons[0].textContent).to.contain('Voted');
	});

	it('renders winner and restart button when there\'s a winner', () => {
		const component = renderIntoDocument(
			<Voting winner='Trainspotting' />
		);
		const winner = ReactDOM.findDOMNode(component.refs.votingWinner);
		expect(winner).to.be.ok;
		expect(winner.textContent).to.contain('Trainspotting');
	});

	it('renders as a pure component', () => {

		const container = document.createElement('div');

		const pair = ['Trainspotting', '28 Days Later'];
		let component = ReactDOM.render(
			<Voting pair={pair} />,
			container
		);
		let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
		expect(firstButton.textContent).to.equal('Trainspotting');

		pair[0] = 'Sunshine';
		component = ReactDOM.render(
			<Voting pair={pair} />,
			container
		);
		firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
		expect(firstButton.textContent).to.equal('Trainspotting');

	});

	it('does update DOM when prop changes', () => {

		const container = document.createElement('div');

		const pair = List.of('Trainspotting', '28 Days Later');
		let component = ReactDOM.render(
			<Voting pair={pair} />,
			container
		);
		let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
		expect(firstButton.textContent).to.equal('Trainspotting');

		const newPair = pair.set(0, 'Sunshine');
		component = ReactDOM.render(
			<Voting pair={newPair} />,
			container
		);
		firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
		expect(firstButton.textContent).to.equal('Sunshine');

	});

});
