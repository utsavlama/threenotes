import React from 'react';
import { useStyles } from './../StyleContext'; // Import the useStyles hook

type TipProps = {
    tips: string;
    training: string[];
    styles?: any;
};

const getTipComponents = ({ tips, training, styles }: TipProps): (React.ReactNode | string)[] => {

    let trainingIndex = training.map((item: string) => ({
        index: tips.indexOf(item),
        training: item,
        letters: item.length,
    }));

    let stringParts: (React.ReactNode | string)[] = [];
    let partGetter = trainingIndex.reduce((acc: number, item: any, index: number) => {
        stringParts.push(tips.substring(acc, item.index));
        stringParts.push(
            <span className={styles.important} key={`imp-${index}`}>
                {tips.substring(item.index, item.index + item.letters)}
            </span>
        );
        acc = item.index + item.letters;
        if (index === trainingIndex.length - 1) {
            stringParts.push(tips.substring(acc));
        }
        return acc;
    }, 0);
    return stringParts;
};

const CharacterTips = ({ tips, training }: TipProps) => {
    const styles = useStyles();
    let styledTips = getTipComponents({ tips, training, styles });
    return <>{styledTips.map((item, index) => <React.Fragment key={index}>{item}</React.Fragment>)}</>;
};

export default CharacterTips;
