# Elemental Quests

<p align="center">
    <img src="./public/assets/readme/banner.jpg" alt="" width=700>
<br><br>
    An innovative experience that blends the thrill of a treasure hunt with the power of storytelling and puzzles to provide a one-of-a-kind soft skills assessment experience.
</p>



# Features

Listed below are all the feature included in the project

## Game Feature

- [x] 5 stages of game
    1. Octet lock
    2. Odd Drawers
    3. Atomic shell
    4. Quartz Quary
    5. Mindful Molecules
- [x] 8 soft skills assessed
    1. Critical Thinking
    2. Memory
    3. Patience
    4. Focus
    5. Stress Management
    6. Problem Solving
    7. Eye for Detail
    8. Emotional Intelligence
- [x] 2 dead ends
    1. First on stage 4: Quartz Quary
    2. Second on stage 5: Mindful Molecules
- [x] 10 clues
- [x] User leader board
- [x] Admin Panel
- [x] User analytics after game ends
- [x] Overall and each user's analyticals in admin panel
- [x] 404 page (route not present error)
- [x] 403 page (insufficient authorization)
- [x] Ability to review previous stage information if stuck on a certain stage
- [x] **Skip** to skip a stage by discarding any points rewarded for that level
- [x] **End game** to end the game if done

## Authentication

- [x] User Sign up
- [x] User Sign in
- [x] Forgot Password (reset password via email)
- [x] admin login

## Authorization

Only logged in users can:
- [x] Play game
- [x] Access user leader board
- [x] Access result analysis
- [x] Only admin can access Admin Panel

# Detailed view of the game

The project has been developed as a way to test soft skills, thus it is only one time play for every user.

## Completion of the game

- The game meant to test the soft skills, thus keeping user stuck on level for ever with no form of rescue is futile.

- To avoid this *Special actions:* **skip** and **End Game**, are available at each stage so user can skip the stage by discarding the points or end the game if required.

## General Instructions for the game are as follows:

- The purpose of this game set is to evaluate your soft skills

- We recommend completing all games in one sitting, as the game is designed to be played only once

- Points are awarded for correct answers and time taken to solve each game

- The timer will not be visible on screen

- In the event of an emergency such as a power outage, technical difficulties, or network issues, you may resume the game from where you left off

- Timer will continue on the server but your progress won't be lost

- Please be attentive to all information presented in the game

- If you find yourself at a dead end, you can choose to review the previous stage, which may provide clues to help you progress past the current stage

- If necessary, you have the option to skip a stage, though this will result in forfeiting any potential points for that stage

- You may end the game at any time, regardless of what stage you are on and receive results till there

# Stage 1: Octet Lock

## Soft skills tested: 3

1. Problem Solving
2. Critical Thinking
3. Eye For Detail

## Dead end: 0

## Clues: 3

The mapping follows the pattern **2, 0, 8, 6,4, 6** and repeats. That is the unit digit of atomic number of noble gases.

1. Name of the stage is "Octet Lock", octet as in the one in chemistry.
2. Chemists name is Mr. M. J. **Noble**, Noble for noble gases
3. Initial pattern is hidden in the story, as numbers that appear, "two product" -> 2, "midnight" is when clock hits -> 0, "minute hand at 8" ->8

## Story
```
You are an aspiring chemist and the faithful assistant of M.J. Noble, a famous chemist and laboratory owner in the city. On a weekend, both of you were manufacturing two products, but when the clock struck midnight, Mr. Noble suggested going out for drinks, appreciating your hard work. He assured you of coming back and completing his part of the work in an hour.

At the bar, after having dinner and few rounds of drinks, Mr. Noble was not sober anymore. He looked at his watch and realized that the minutes hand was about to hit 8. Hurriedly, he rushed you back to the laboratory, where you found the door locked with puzzle that he himself had put in place to prevent him from touching the chemicals while being drunk.

To unlock the door and complete the ongoing processes, you need to solve the puzzle first ! 
```

## Puzzle

Some characters are mapped to another i.e. encrypted to decrypted. Identify the pattern between these mapping and form you own key for the given string.

## Solution

<details> 
  <summary>Beware solution below, click to see? </summary>
  Litmus 
</details>

## Motive

This stage aims to establish the story and characteristics of the agents involved.
This is base test to assess problem solving and feed user details that will come in handy in later stages that if ignored will lead to possible dead ends.

# Stage 2: Odd Drawer

## Soft skills tested: 2

1. Problem Solving
2. Memory

## Dead end: 0

## Clues: 2

In the note presented in this stage story, two clues are hidden that are used to set premise of chemist being a recovering alcoholic.
Since existence of this note points to this being a recurring event.

1. No experimenting with new formulas tonight!
2. Don't listen to what you've consumed, you can recover 

## Story
```
After unlocking the door, Mr. Noble hurried towards a drawer and disrupted some test tubes containing chemicals. Maintaining the order of chemicals is critical to complete the process.
To prevent your competitors from using the formula, you did not write down the order, but you have a set of instructions saved with you to help you achieve the correct order.

In midst of this chaos, you found a note that Mr. Noble wrote for his himself:

1. Don't touch the chemicals, especially the green one!
2. Remember, the order matters! Don't mess it up
3. No experimenting with new formulas tonight!
4. Don't listen to what you've consumed, you can recover
5. Don't confuse the red and blue beakers, they look similar

Follow the given instructions and figure out the correct order. 
```

## Puzzle

Arrange the test tubes filled with different chemical in the order mentioned in the game section.

## Solution

<details> 
  <summary>Beware solution below, click to see? </summary>
  HNO3,HCL,HBR,H2S,H2O,HI,HF,NAOH,H2SO4 
</details>

## Motive

This stage is design to assess memory and deduction skills of the user.

# Tech stack:

## Frontend

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)

![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

## Backend
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD)

## Database and Authentication

![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)


## Hosting 

![Glitch](https://img.shields.io/badge/glitch-%233333FF.svg?style=for-the-badge&logo=glitch&logoColor=white)

# Project Set-up
## Install Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

## Install Project

    $ git clone https://github.com/jhamadhav/elementalQuests.git
    $ cd elementalQuests
    $ npm install

## Configure Project

This project uses Firebase technology, to configure this project for your self create project on firebase and replace credentials at required locations


# Credits
izitoast: https://izitoast.marcelodolza.com/

moving background: https://codepen.io/kootoopas/pen/kGPoaB
