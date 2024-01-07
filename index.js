const {
    Bot,
    Keyboard,
    InlineKeyboard,
    HttpError,
    GrammyError,
} = require('grammy');

const {
    getRandomQuestion,
    getCorrectAnswer
} = require('./utils');

require('dotenv').config();

const bot = new Bot(process.env.BOT_TOKEN);

bot.command('start', async (ctx) => {
    const menuKeyboard = new Keyboard()
        .text('.NET')
        .text('Patterns')
        .row()
        .text('DBMS')
        .text('Agile')
        .row()
        .text('Random')
        .resized();

    await ctx.reply(
        'Hello! \n I\'m the bot who help you with preparation to .NET interview.\nChoose the question topic below: ', {
        reply_markup: menuKeyboard,
    });
});

bot.hears(
    ['.NET', 'Patterns', 'DBMS', 'Agile', 'Random'],
    async (ctx) => {

        const topic = ctx.message.text;
        const {
            question,
            questionTopic
        } = getRandomQuestion(topic);

        let inlineKeyboard;

        if (question.isChoosable) {
            const mappedButtons = question.options.map((option) => [
                InlineKeyboard.text(
                    option.text,
                    JSON.stringify({
                        type: `${questionTopic}-option`,
                        isCorrect: option.isCorrect,
                        questionId: question.id,
                    }),
                ),
            ]);

            inlineKeyboard = InlineKeyboard.from(mappedButtons);
        } else {
            inlineKeyboard = new InlineKeyboard().text(
                'Answer',
                JSON.stringify({
                    type: questionTopic,
                    questionId: question.id,
                }),
            );
        }

        await ctx.reply(question.text, {
            reply_markup: inlineKeyboard,
        });
    },
);

bot.on('callback_query:data', async (ctx) => {
    const callbackData = JSON.parse(ctx.callbackQuery.data);

    if (!callbackData.type.includes('option')) {
        const answer = getCorrectAnswer(callbackData.type, callbackData.questionId);

        await ctx.reply(answer, {
            parse_mode: 'HTML',
            disable_web_page_preview: true,
        });

        await ctx.answerCallbackQuery();
    } else if (callbackData.isCorrect) {
        await ctx.reply('Correct!');
        await ctx.answerCallbackQuery();
    } else {
        const answer = getCorrectAnswer(
            callbackData.type.split('-')[0],
            callbackData.questionId,
        );

        await ctx.reply(`Wrong:( The correct answer is: ${answer}`);
        await ctx.answerCallbackQuery();
    }
});

bot.catch((err) => {
    const ctx = err.ctx;
    console.error(`Update handling error (id: ${ctx.update.update_id})`);
    const e = err.error;
    if (e instanceof GrammyError) {
        console.error('Request error:', e.description);
    } else if (e instanceof HttpError) {
        console.error('Telegram is unavailable:', e);
    } else {
        console.error('Unknown error:', e);
    }
});

bot.start();