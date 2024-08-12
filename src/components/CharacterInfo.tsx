import React from 'react';
import CharacterTips from './CharacterTips/CharacterTips';
import { useStyles } from './StyleContext'; // Import the useStyles hook
import characterImages from '../data/characterImages.json'; // Import your character images JSON



type ClassProgressionType = {
    [key: string]: string
};

type CharacterInfoProps = {
    selectedCharacter: {
        name: string;
        training: string[];
        tips: string;
        classProgression: ClassProgressionType[];
    } | null;
};

const CharacterInfo: React.FC<CharacterInfoProps> = ({ selectedCharacter }) => {
    const styles = useStyles();

    if (!selectedCharacter) {
        return <div>Please select a character to view their information.</div>;
    }

    // Find the image for the selected character
    const characterImage = characterImages.find(
        (img) =>
            img.alt.toLowerCase() === selectedCharacter.name.toLowerCase() ||
            (selectedCharacter.name.toLowerCase() === "byleth" && img.alt === "Byleth-M")
    );

    return (
        <div className={styles.character}>

            <h2>{selectedCharacter.name}</h2>
            <div className={styles.training}>

                {characterImage && (
                    <div className={styles.imageContainer}>
                        <img
                            src={characterImage.src.split("/revision/")[0]}
                            alt={characterImage.alt}
                            className={styles.characterImage}
                        />
                    </div>
                )}
                <p><strong>Training:</strong> {selectedCharacter.training.join(', ')}</p>
                <ul>
                    <li><CharacterTips tips={selectedCharacter.tips} training={selectedCharacter.training} /></li>
                </ul>
            </div>
            <div className={styles.classProgression}>
                {selectedCharacter.classProgression.map((progress, idx) => (
                    <div key={idx} className={styles.classStep}>
                        <p>Class Progression:</p>
                        <span>{progress.progression}</span>
                        <p>Requirements:</p>
                        <span>{progress.requirements}</span>
                        <p>How Long:</p>
                        <ul>
                            {progress.howLong.split(',').map((item, subIdx) => {
                                let term = item.trim();

                                let delimeter = " until ";

                                let classTitleParts = item.split(delimeter);
                                if (classTitleParts.length <= 1) {
                                    delimeter = " for ";
                                    classTitleParts = item.split(delimeter);
                                }

                                let classTitle = classTitleParts[0].trim();

                                let liChild: string | JSX.Element = term;
                                if (progress.progression.toLowerCase().includes(classTitle.toLowerCase())) {
                                    liChild = <LiContent classTitleParts={classTitleParts} delimeter={delimeter} />;
                                }


                                return <li key={`howLong-${subIdx}`}>{liChild}</li>
                            })}
                        </ul>
                        <p>Tips:</p>
                        <span>{progress.tips}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const LiContent = ({ classTitleParts, delimeter }: { classTitleParts: string[], delimeter: string }) => {
    const styles = useStyles();
    return <><span className={styles.classHighlight}>{classTitleParts[0]}</span> {delimeter} {classTitleParts.filter((x, i) => i > 0).join(delimeter)}</>
}

export default CharacterInfo;
