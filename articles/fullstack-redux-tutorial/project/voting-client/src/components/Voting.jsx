import React from 'react';

class Voting extends React.Component {
    getPair = function() {
        return this.props.pair || [];
    }

    isDisabled() {
        return !!this.props.hasVoted;
    }

    hasVotedFor() {
        return this.props.hasVoted === entry;
    }

    render = function() {
        return (
            <div className="voting">
            {this.getPair().map(entry => 
                <button key={entry}
                    onClick={() => this.props.vote(entry)}>
                    <h1>{entry}</h1>
                    {this.hasVotedFor(entry) ?
                        <div className="label">Voted</div>
                        null}
                </button>
            )}
            </div>
        );
    }
}

export default Voting;

