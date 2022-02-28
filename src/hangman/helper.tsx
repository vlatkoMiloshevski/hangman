import img from "./../assets/hangman_1.png";
import img1 from "./../assets/hangman_2.png";
import img2 from "./../assets/hangman_3.png";
import img3 from "./../assets/hangman_4.png";
import img4 from "./../assets/hangman_5.png";
import img5 from "./../assets/hangman_6.png";
import img6 from "./../assets/hangman_7.png";
import img7 from "./../assets/hangman_8.png";
import wordListJson from "../db/db-mk.json";

export const wording = {
  gameName: "Бесилка",
  guessedWords: "Погодени зборови",
  playAgain: "играј пак",
  share: "сподели",
  copyForSharing: "копирај за споделување",
  url: "https://besilka-mk.web.app",
  code: "https://github.com/vlatkoMiloshevski/hangman",
  accessCode: "Пристапи до кодот на играта",
  playGame: "Играј Бесилка",
  keyboardLetters: [
    "А Б В Г Д Ѓ Е Ж",
    "З Ѕ И Ј К Л Љ М",
    "Н Њ О П Р С Т Ќ",
    "У Ф Х Ц Ч Џ Ш",
  ],
};

export const getImg = (length: number) => {
  if (length === 0) {
    return img;
  } else if (length === 1) {
    return img1;
  } else if (length === 2) {
    return img2;
  } else if (length === 3) {
    return img3;
  } else if (length === 4) {
    return img4;
  } else if (length === 5) {
    return img5;
  } else if (length === 6) {
    return img6;
  } else if (length === 7) {
    return img7;
  } else {
    return img7;
  }
};

export const getRandomWord = () => {
  const randomWord =
    wordListJson[
      Math.floor(wordListJson.length * Math.random())
    ].toLocaleUpperCase();
  return Object.keys(randomWord).map((key: any) => randomWord[key]);
};

const generateEmoji = (fullArray: string[], failArray: string[]) => {
  if (fullArray && failArray) {
    return fullArray
      .map((letter: any) => (failArray.includes(letter) ? "⬜" : "🟩"))
      .join("");
  }
  return "";
};

export const shareStatus = (
  fullArray: string[],
  failArray: string[],
  word: string[],
  score: { wins: number; total: number }
) => {
  return `${wording.guessedWords}: ${score.wins}/${score.total}\n\n${word
    .map((letter) => letter.toUpperCase())
    .join("")}\n${generateEmoji(fullArray, failArray)}\n\n${wording.playGame}`;
};

export const isMobile = window.matchMedia(
  "only screen and (max-width: 760px)"
).matches;
