import React, { useState } from 'react';
import CharacterSearch from './CharacterSearch/CharacterSearch';
import CharacterInfo from './CharacterInfo';
import characterData from '../data/characters.json'; // Import your character data
import { StyleContext } from './StyleContext'; // Import the context
import styles from './CharacterInfo.module.css'; // Import your CSS module

const CharacterGuide = () => {
    const [inputValue, setInputValue] = useState<string>('');

    const handleInputChange = (newInputValue: string) => {
        setInputValue(newInputValue);
    };

    const filteredCharacters = characterData.characters.filter((character) =>
        character.name.toLowerCase().includes(inputValue.toLowerCase())
    );

    return (
        <StyleContext.Provider value={styles}>
            <div>
                <h1>Character guide for Crimson Flower route</h1>
                <CharacterSearch inputValue={inputValue} onInputChange={handleInputChange} />
                {filteredCharacters.length > 0 ? (
                    filteredCharacters.map((character, index) => (
                        <CharacterInfo key={index} selectedCharacter={character} />
                    ))
                ) : (
                    <div>No characters match your search.</div>
                )}
            </div>
        </StyleContext.Provider>
    );
};

export default CharacterGuide;
