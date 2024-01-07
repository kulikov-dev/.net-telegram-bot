const { Random } = require('random-js');

const questions = require('./questions.json');

/**
 * Get random question by topic
 * @param {string} topic
 * @returns {string,string} Question, topic
 */
const getRandomQuestion = (topic) => {
    const random = new Random();

    let questionTopic = topic.toLowerCase();

    if (questionTopic === 'random') {
        let randomTopicIndex = random.integer(0, Object.keys(questions).length - 1);
        questionTopic = Object.keys(questions)[randomTopicIndex];
    }

    const questionIndex = random.integer(0, questions[questionTopic].length - 1);

    return {
        question: questions[questionTopic][questionIndex],
        questionTopic,
    };
};

/**
 * Get correct answer by question identifier
 * @param {string} topic Question topic
 * @param {number} id Question identifier
 * @returns {string} Answer
 */
const getCorrectAnswer = (topic, id) => {
    const question = questions[topic].find((question) => question.id === id);

    return question.isChoosable ? question.options.find((option) => option.isCorrect).text : question.answer;
};

module.exports = { getRandomQuestion, getCorrectAnswer };