
const WrongLetters = ({ wrongLetters }) => {
    return (
        <div className="wrong-letters-container">
            <div>
                {/* if wrong letters length > 0, create <p>Wrong</p>; only created once a wrong letter is entered*/}
                {wrongLetters.length > 0 && <p>Wrong Letters:</p>}
                {wrongLetters
                    .map((letter, i) => <span key={i}>{letter}</span>)
                    .reduce((previous, current) => previous === null ? [current] : [previous, ', ', current], null)}
                    {/* ^^ adding a comma between each wrong letter */}
            </div>
        </div>
    )
}

export default WrongLetters
