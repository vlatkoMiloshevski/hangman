import { Button, Grid, Link, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Keyboard from "react-simple-keyboard";
import { isMobile, getImg, getRandomWord, shareStatus, wording } from "./helper";
import CodeIcon from '@mui/icons-material/Code';

export const Hangman = () => {
    const numOfMaxErrors = 6;
    const [fullArray, setFullArray] = useState<string[]>([]);
    const [failArray, setFailArray] = useState<string[]>([]);
    const [word, setWord] = useState(getRandomWord());
    const [score, setScore] = useState({ wins: 0, total: 0 });
    const [isCorrect, setCorrect] = useState(false);
    const [isWrong, setWrong] = useState(false);
    const [showCode, setShowCode] = useState(false);

    useEffect(() => {
        if (isCorrect || isWrong) {
            setScore({ wins: score.wins + +isCorrect, total: score.total + 1 });
        }
    }, [isCorrect, isWrong])

    const onKeyReleased = (button: string) => {
        if (failArray.length > numOfMaxErrors) {
            return;
        }

        if (!fullArray.includes(button)) {
            setFullArray([
                ...fullArray,
                ...word.filter((letter) => letter === button),
            ]);
            setCorrect(word.filter((letter) => [...fullArray, button].includes(letter)).length === word.length);
        }

        if (
            !word.includes(button) &&
            !failArray.includes(button)
        ) {
            setFullArray([...fullArray, button]);
            setFailArray([...failArray, button]);
            setCorrect(word.filter((letter) => [...fullArray, button].includes(letter)).length === word.length);
            setWrong([...failArray, button].length > numOfMaxErrors);
        }
    };

    const playAgain = () => {
        setFullArray([]);
        setFailArray([]);
        setCorrect(false);
        setWrong(false);
        setWord(getRandomWord());
    };

    const mobileHandler = () => {
        const shareData = {
            title: wording.gameName,
            text: shareStatus(fullArray, failArray, word, score),
            url: wording.url,
        };
        navigator.share(shareData);
    };

    const clickShowCode = () => {
        setShowCode(!showCode);
    }

    const desktopHandler = () => {
        const shareText = shareStatus(fullArray, failArray, word, score)
        navigator.clipboard.writeText(`${shareText}\n${wording.url}`);
    };

    const shareButton = (isMobile ?
        <Button onClick={mobileHandler} variant="outlined">{wording.share}</Button> :
        <Button onClick={desktopHandler} variant="outlined">{wording.copyForSharing}</Button>
    );

    const inputClassName = isCorrect ? "has-won" : "has-not-won";

    const keyboardCorrectWords = fullArray.filter((letter) => word.includes(letter)).length ? fullArray.filter((letter) => word.includes(letter)).join(" ") : "а";

    const keyboardWrongWords = failArray.length ? failArray.join(" ") : "а";

    const correctInputField = (letter: string, index: number) => (fullArray.includes(letter) ? (
        <>
            <input key={index}
                type="text"
                maxLength={1}
                placeholder=""
                disabled
                className={inputClassName}
                value={letter}
            />
            <>{" "}</>
        </>
    ) : (
        <>
            <input key={index}
                type="text"
                maxLength={1}
                placeholder=""
                value=""
                disabled
            />
            <>{" "}</>
        </>
    ));

    const wrongInputField = (letter: string, index: number) => (
        <>
            <input
                key={index}
                type="text"
                maxLength={1}
                placeholder=""
                className="has-lost"
                value={letter}
                disabled
            />
            <>{" "}</>
        </>);

    return (
        <Grid container item xs={12} md={6} lg={4} className="hangman">
            <Grid container item xs={12}>
                <Grid item xs={12}>
                    <Typography variant="caption">
                        {wording.guessedWords}
                    </Typography>
                    <Typography paragraph variant="caption">
                        {score.wins}/{score.total}
                    </Typography>
                </Grid>
                <Grid item xs={11}>
                    <Typography paragraph>
                        <img alt="hangman" src={getImg(failArray.length)} width="90%" />
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    {isWrong &&
                        <Typography paragraph>
                            {word.map((letter, index) => wrongInputField(letter, index))}
                        </Typography>
                    }
                </Grid>
                <Grid item xs={12}>
                    {!isWrong &&
                        <Typography paragraph>
                            {word.map((letter, index) => correctInputField(letter, index))}
                        </Typography>
                    }
                </Grid>
                <Grid item xs={12}>
                    {(isCorrect || isWrong) &&
                        <Typography paragraph>
                            <Button onClick={playAgain} variant="outlined">{wording.playAgain}</Button>
                        </Typography>
                    }
                </Grid>
                <Grid item xs={12}>
                    {isCorrect ? (<Typography paragraph>{shareButton}</Typography>) : (<></>)}
                </Grid>
            </Grid>
            <Grid container item xs={12}>
                {
                    !isWrong && !isCorrect && <Keyboard
                        onKeyReleased={onKeyReleased}
                        layout={{
                            default: wording.keyboardLetters,
                        }}
                        buttonTheme={[
                            {
                                class: "hg-correct",
                                buttons: keyboardCorrectWords,
                            },
                            {
                                class: "hg-wrong",
                                buttons: keyboardWrongWords,
                            },
                        ]}
                    />
                }
            </Grid >
            <Grid container item xs={12} marginTop={4}>
                <Typography>
                    <Link target="_blank" className="link">
                        <CodeIcon fontSize="small" onClick={clickShowCode} />
                    </Link>
                </Typography>
            </Grid>
            <Grid container item xs={12}>
                {showCode && <Link href={wording.code}>{wording.accessCode}</Link>}
            </Grid>
        </Grid >
    );
}

export default Hangman;
