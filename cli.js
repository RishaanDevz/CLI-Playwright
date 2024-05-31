// cli.js
const readline = require('readline');
const { playSong } = require('./youtube');
const { borrowBook } = require('./libby');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.setPrompt('> ');
rl.prompt();

rl.on('line', async (line) => {
    const input = line.trim();
    if (input.startsWith('borrow')) {
        const match = input.match(/borrow\s+"(.+)"\s+on\s+libby/i);
        if (match) {
            const bookName = match[1];
            console.log(`Borrowing book "${bookName}" on Libby...`);
            try {
                await borrowBook(bookName);
                console.log(`Successfully borrowed "${bookName}".`);
            } catch (err) {
                console.error(`Failed to borrow "${bookName}":`, err);
            }
        } else {
            console.log('Invalid command format. Use: borrow "book name" on libby');
        }
    } else if (input.startsWith('play')) {
        const match = input.match(/play\s+"(.+)"\s+on\s+youtube/i);
        if (match) {
            const songName = match[1];
            console.log(`Playing song "${songName}" on YouTube...`);
            try {
                await playSong(songName);
                console.log(`Successfully played "${songName}".`);
            } catch (err) {
                console.error(`Failed to play "${songName}":`, err);
            }
        } else {
            console.log('Invalid command format. Use: play "song name" on youtube');
        }
    } else {
        console.log('Unknown command');
    }
    rl.prompt();
}).on('close', () => {
    console.log('Exiting...');
    process.exit(0);
});
