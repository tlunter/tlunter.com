/** @jsx React.DOM */

var Views = Views || {};
Views.About = React.createClass({
  render: function() {
    return (
      <div className="about">
        <h1 id="title">About Me</h1>
        <p>
          I am currently located in Boston, MA and attending Northeastern University.
          I am completing a Bachelors in Computer Engineering with a minor in Computer Science.
        </p>
        <p>
          While in classes, I work at the ResNet Resource Center.
          Originally the job description entailed fixing other students computers.
          I became lead developer, and for the past few years I've been working on in house Django projects.
        </p>
        <p>
          Northeastern requires experiential learning to graduate and consequently is a 5 year school with a strange schedule.
          For 6 months, from July to January, I work full time at a company in my field and put classes on hold.
          Summer and Fall of 2012, I was at <a href="https://www.qinetiq-na.com/products/unmanned-systems/" target="_blank">QinetiQ-NA Techonology Solutions Group Unmanned Systems</a> as a Robotics Software Engineering Coop.
          Summer and Fall of 2013, I was at <a href="http://www.swipely.com" target="_blank">Swipely, Inc.</a> as a Software Engineer Intern.
        </p>
        <p>
          At QinetiQ, I worked on a scalable autonomous robotic kernel written in C++.
          Using LIDARs and GPS, we were able to map rooms and plot paths the robot could use to drive from point A to point B avoiding all possible obstacles.
          I also worked on a small PICMicrocontroller part that would read from I2C and connect and charge or discharge lead acid batteries.
        </p>
        <p>
          At Swipely, I worked on a large Ruby on Rails codebase that facilitates our merchants in understanding their credit card sales.
          In addition, I worked a DevOps role, writing Ruby gems to package applications in a Linux container leveraging Docker and pushing the package to Amazon Web Services to be deployed to their network.
        </p>
        <p>
          In my free time, I am tinkering with languages like Ruby, Python, Haskell, and JS and I've worked with Lisp, Racket, Cocoa, C, C++ and PHP in the past.
          I've become increasingly interested in big data applications and graphing the movement of data on the internet.
        </p>
        <p>
          I spent a weekend throwing together <a href="http://www.hn-history.com">HN History</a>, a simple application to track the HackerNews front page over time (every 5 minutes).
        </p>
        <p>
          I'm always looking for interesting hardware and software hacks to spend a weekend pulling together.
          Lately, I've been comparing Google's AngularJS and Facebook's React for a frontend view layer.
          I've grown accustomed to using Sinatra and Grape as a backend JSON endpoint API.
          While working at ResNet, I work with the Django Framework, leveraging Celery for task queueing.
        </p>
        <p>
          Feel free to look at my contributions to various open source projects.
        </p>
      </div>
    );
  }
});
