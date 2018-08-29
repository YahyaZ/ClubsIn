# ClubIn

ClubIn is a web application created using the MERN stack and is used to manage university clubs and societies internal executive activities predominantly on the management of events.


## Installation and Running of the Project


Installing The project:

`npm install -g yarn`

To run project:

Start backend server - `yarn start:server`

Start react client - `yarn start:client` 

Start both simultaneously - `yarn start:dev` 

## Code Style and Guidelines

* All variables should be in lower camel case e.g. emailAddress
* There should be spaces around the operators and after commas e.g. ["UTS", "UNSW", ]
* All files should have comments on the top describing what the file does. Methods which are not self explaining must have comments in it
* File Names should be in lower camel case unless it is a component and then it can be in Upper case unless it is an index.js
* Braces must be used for all control structures even if the body contains 1 line
* Must adhere to the DRY principle, if there is repititon in the code, a new method or function must be created and then that will be used
* If there are subcomponents, those components must reside in the parent's component's folder
* The file name within a component folder must have index.js as the main file. 
* Supporting CSS may be used in the components iff it is only related to component. If is used by many components, it must be used within the main css file.
* The server side folders must be split accordingly to separte concerns, i.e. there should be a model folder, api/routing folder and database folder
* If a component does not have any state, it should be made into a functional component
* If a component is very complex, it can be broken down into functional components within the class (if it has not been used by another class)
* A component must only do **one** thing
* All javascript statements must be terminated with a `;`
* If a component has many properties, each property must be initialised on a new line, in line with the previous component.
* Use `const` and `lets`, **NEVER** use `var`
* Use trailing commas in arrays and objects, e.g. ['One', 'Two', ]

## Credits

* Malek Darwiche
* Yahya Zein
* Ramanathan Udaiyappan

## Acknowledgements

Made in the Advanced Internet Programming Course at UTS.

Subject Coordinator - Bejamin Johnson
