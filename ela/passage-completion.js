const paragraphs = [
  "A butterfly goes through four stages in its life. It starts as an egg, which hatches into a caterpillar. The caterpillar eats leaves and grows. Then, it forms a chrysalis around itself. Inside the chrysalis, it changes into a butterfly. When it is ready, the butterfly comes out and flies away.",
  "Trees help people and animals in many ways. They give us shade on hot days. Trees also clean the air and provide homes for birds and squirrels. Some trees grow fruit, like apples and oranges. Without trees, the world would be a very different place!",
  "Lena and her family went to the beach on a sunny day. She built a tall sandcastle while her brother splashed in the waves. Her parents sat under an umbrella, reading books. They all ate a picnic lunch and watched the seagulls fly overhead.",
  "After a rainy day, you might see a rainbow in the sky. Rainbows appear when sunlight shines through raindrops. The light bends and spreads out into different colors. That is why you can see red, orange, yellow, green, blue, and purple in a rainbow.",
  "Birds sing for different reasons. Some birds sing to find a mate, while others sing to mark their territory. Singing can also help birds communicate with each other. Each bird species has its own special songs and calls.",
  "Marcus was nervous about his first day of third grade. He didn't know who his teacher would be or if he would have friends in his class. When he walked in, his teacher smiled and welcomed him. By the end of the day, Marcus felt happy and excited for the school year.",
  "There are four seasons in a year. In spring, flowers bloom, and animals wake up from hibernation. Summer is hot and sunny, perfect for swimming. Fall brings cooler weather and colorful leaves. Winter is cold, and in some places, it snows.",
  "A desert is a dry place with very little rain. Some deserts are hot, like the Sahara, while others are cold, like Antarctica. Many animals, like camels and lizards, can survive in the desert because they need little water.",
  "Firefighters have an important job. They put out fires and rescue people from dangerous situations. They wear special gear to protect themselves from smoke and heat. Firefighters also teach people how to stay safe.",
  "Music is all around us. It can make us feel happy, excited, or even calm. Some people play instruments like the piano or guitar. Others love to sing or dance to their favorite songs. Music is a wonderful way to express feelings.",
  "Plants need sunlight, water, and soil to grow. A seed is planted in the soil, and with the right care, it sprouts into a small plant. Over time, it grows bigger and stronger, producing flowers, fruits, or vegetables.",
  "Many children place a lost tooth under their pillow at night. The next morning, they find a small gift or money in its place! Some people believe the Tooth Fairy visits while they sleep and takes the tooth in exchange for a surprise.",
  "Working together is important. When people cooperate, they can finish tasks faster and better. In sports, teammates must communicate and support each other to win. At school, classmates can help one another understand lessons.",
  "David and his family went to the zoo on Saturday. They saw lions, zebras, and penguins. His favorite animal was the giraffe because it had a long neck. At the end of the day, David bought a stuffed monkey as a souvenir.",
  "Teachers have an important job. They help students learn new things, like reading, math, and science. They also teach kindness and respect. Teachers work hard to make sure every child understands their lessons.",
  "Sleeping helps our bodies rest and grow. When we sleep, our brains organize everything we learned during the day. If we don't get enough sleep, we may feel tired and grumpy. That's why it's important to go to bed on time!",
  "Outer space is full of amazing things! There are planets, stars, and even black holes. Astronauts travel into space to learn more about it. One day, people might even live on other planets!",
  "Jessica went to the supermarket with her dad. They bought fresh fruits, vegetables, and milk. Jessica helped by pushing the cart. At the checkout, she handed the cashier some coupons. Shopping was fun and helpful!",
  "Ants are tiny insects, but they work very hard. They build tunnels underground and carry food back to their colony. Each ant has a special job, and they all work together. That is why they are so successful!",
  "Johnny Appleseed was a man who planted apple trees across the United States. He wanted to make sure people had food to eat. His kindness and love for nature made him a famous folk hero."
];

const wordBank = ["happy", "strong", "blue", "jump", "run", "fast", "slow", "bright", "dark", "cloud", "rain", "sunny", "moon", "star", "ocean", "river", "mountain", "valley", "grass", "tree", "flower", "garden", "house", "castle", "village", "city", "road", "bridge", "train", "bus", "car", "bike", "airplane", "helicopter", "boat", "ship", "island", "desert", "forest", "jungle", "elephant", "tiger", "lion", "giraffe", "zebra", "rabbit", "fox", "bear", "eagle", "owl", "sparrow", "whale", "dolphin", "shark", "fish", "octopus", "penguin", "crocodile", "snake", "frog", "butterfly", "ant", "bee", "spider", "caterpillar", "snail", "horse", "cow", "sheep", "goat", "chicken", "duck", "turkey", "farmer", "teacher", "doctor", "nurse", "pilot", "firefighter", "policeman", "chef", "singer", "dancer", "actor", "painter", "writer", "reader", "climber", "swimmer", "runner", "walker", "jumper", "laugh", "smile", "cry", "think", "dream", "explore", "discover", "invent", "create", "build", "destroy", "fix"];

let correctAnswers = [];

function getRandomParagraph() {
    return paragraphs[Math.floor(Math.random() * paragraphs.length)];
}

function getRandomOptions(correctWord) {
    let options = [correctWord];
    while (options.length < 3) {
        let randomWord = wordBank[Math.floor(Math.random() * wordBank.length)];
        if (!options.includes(randomWord)) {
            options.push(randomWord);
        }
    }
    return options.sort(() => Math.random() - 0.5);
}

function replaceWordsWithDropdowns(text) {
    let words = text.split(" ");
    let indexes = [];
    correctAnswers = [];
    
    while (indexes.length < 5) {
        let randomIndex = Math.floor(Math.random() * words.length);
        if (!indexes.includes(randomIndex)) {
            indexes.push(randomIndex);
        }
    }
    
    indexes.sort((a, b) => a - b); // Ensure indexes are in order
    
    indexes.forEach(index => {
        let correctWord = words[index].replace(/[^a-zA-Z]/g, "");
        correctAnswers.push({ index, word: correctWord });
        let options = getRandomOptions(correctWord);
        words[index] = `<select class='quiz-dropdown'><option value=''>Select</option>` + options.map(opt => `<option value='${opt}'>${opt}</option>`).join('') + `</select>`;
    });
    
    return words.join(" ");
}

function loadNewParagraph() {
    let paragraph = getRandomParagraph();
    document.getElementById("paragraph").innerHTML = replaceWordsWithDropdowns(paragraph);
    document.getElementById("result").innerText = "";
}

function checkAnswers() {
  let selects = document.querySelectorAll(".quiz-dropdown");
  let correctCount = 0;
  
  selects.forEach((select, i) => {
      if (select.value === correctAnswers[i].word) {
          select.classList.add("correct");
          select.classList.remove("incorrect");
          correctCount++;
      } else {
          select.classList.add("incorrect");
          select.classList.remove("correct");
      }
  });
  
  document.getElementById("result").innerText = `You got ${correctCount} out of 4 correct!`;
}

window.onload = loadNewParagraph;