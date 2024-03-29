module.exports = {
  pretty: true,
  locals: {
    title: 'Evan Pavlica, Software Engineer',
    bio: 'Portland-based Software Engineer Evan Pavlica has over 5 years of experience creating web experiences.  Specializing in Ruby and Javascript, he has worked on projects ranging from e-commerce sites to specialty product launch pages.  Evan has a passion for clean, self-documenting code, and for embracing the latest web standards and technologies.  In his personal time, he is proud to sing with the Portland Gay Men\'s Chorus.',
    resume: {
      work_experience: [
        {
          name: 'Sony Pictures Entertainment',
          title: 'Manager, Software Engineering',
          dates: {
            from: 'May 2016',
            to: 'Present'
          },
          description: 'As a member of the Digital Media Group, provide modern, cloud-based solutions for the studio\'s digital media supply chain.'
        },
        {
          name: 'Alto Labs',
          title: 'Software Engineer',
          dates: {
            from: 'Sept 2014',
            to: 'May 2016'
          },
          description: 'Created new features and maintained exiting systems for multiple clients.  Lead the development of new projects.'
        },
        {
          name: 'General Assembly',
          title: 'Instructor, Web Development Immersive',
          dates: {
            from: 'Feb 2014',
            to: 'Sept 2016'
          },
          description: 'Instructed dozens of developers in Rails, AngularJS, and more for the full-time Web Development Immersive course.'
        },
        {
          name: 'Music Prodigy',
          title: 'Apprentice Web Developer',
          dates: {
            from: 'Feb 2014',
            to: 'Apr 2014'
          },
          description: 'Enhanced existing features and refactored legacy code in collaboration with a talented full-remote team.'
        }
      ],
      projects: [
        {
          name: 'Sony Pictures Runner',
          stack: 'Ruby on Rails, AngularJS, React, Elasticsearch, Docker, Webpack, Chef, Postgresql, AWS',
          description: 'As the central repository for all of the studio\'s digital assets, Runner is a linchpin in many workflows.  Features include file uploads and sharing, image resizing, metadata tagging, and video proxy generation, as well as archival (Glacier) storage.'
        }, {
          name: 'Boombotix',
          stack: 'Ruby on Rails, AngularJS, Spree, Postgresql, Heroku',
          description: 'The Boombotix website and store offered several unique features, including a custom speaker builder and a \'Get OBD ID\'d\' feature promoting the brand\'s collaboration with WuTang Clan.  The Spree framework served as the backend for this Heroku-hosted application.'
        },
        {
          name: 'Snappic',
          stack: 'Ruby on Rails, Polymer, Postgresql, Digital Ocean',
          description: 'The MVP of Snappic provided eCommerce companies a way to leverage their social media presence into sales, through integrations with Shopify and Instagram.'
        }
      ],
      education: [
        {
          name: 'General Assembly',
          program: 'Web Development Immersive',
          year: 2013
        },
        {
          name: 'Columbia College Hollywood',
          program: 'BFA, Cinema and Television',
          year: 2008
        }
      ]
    }
  }
}
