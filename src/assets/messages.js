const ACTIONS = {
  ADVENTURE: 'adventure',
  NAVIGATE:  'navigate',
  QUIT:      'quit',
  EXIT:      'quit'
};

const MESSAGES = {
  welcome: {
    message: `Welcome Visitor!
        You arrive in a dimly-lit room that appears to be an office.
        A man is in front of a computer, typing something into a text editor. He turns as you approach.

        "Hi there!" he says, "I'm Evan. Welcome to my office. What can I do for you today?"
      `,
    options: [
      {
        text: 'Ask, "Who are you?"',
        action: ACTIONS.ADVENTURE,
        target: 'about',
        key: 'w'
      },
      {
        text: 'Demand to see resume',
        action: ACTIONS.NAVIGATE,
        target: 'resume',
        key: 'r'
      },
      {
        text: 'Leave',
        action: ACTIONS.QUIT,
        key: 'q'
      }
    ]
  },
  about: {
    message: `
      Evan smiles, bashfully.
      "I'm a full-stack software engineer, specializing in Ruby and Javascript. I have several years of experience writing, testing, and maintaining business-essential software."

      He gestures at the screen in front of him.
      "Would you like me to show you some things I'v worked on?"
    `,
    options: [
      {
        text: 'Say "Sure."',
        action: ACTIONS.ADVENTURE,
        target: 'projects',
        key: 'y'
      },
      {
        text: 'Say "Maybe Later."',
        action: ACTIONS.ADVENTURE,
        target: 'projects',
        key: 'n'
      },
      {
        text: 'Demand to see resume',
        action: ACTIONS.NAVIGATE,
        target: 'resume',
        key: 'r'
      },
      {
        text: 'Leave',
        action: ACTIONS.QUIT,
        key: 'q'
      }
    ]
  }
};

export { MESSAGES };
