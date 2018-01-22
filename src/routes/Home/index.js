import React, { Component } from 'react'
import { Link } from 'react-router-dom'
class Home extends Component {
  render() {
    return (
      <div>
        <section className="hero">
          <div className="container">
            <div className="row">
              <div className="">
                <h1>Nokia NSP Hackathon 2018</h1>
                <h4 className="hero-heading">
                  Let's build something together.
                </h4>
                <Link className="button button-primary" to="/ideas">
                  View Ideas and sign up
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="about">
          <div className="container">
            <h3>About</h3>
            <p>
              This event is an internal departmental hackathon. We want you to
              think outside the box and create something new and interesting in
              teams. Don't worry if you don't have any big ideas and don't worry
              if you are not the strongest developer, everything is team based.
            </p>
            <p>
              At the end of the event, a panel of judges will review each team
              and decide the winners.
            </p>
            <Link className="button button-secondary" to="/ideas">
              Sign up
            </Link>
          </div>
        </section>

        <section id="faq" className="faq">
          <div className="container">
            <h3>FAQ</h3>
            <h5>When is it?</h5>
            <p>Thursday, Feb 22 at 4pm until Friday, Feb 23 at 6pm.</p>

            <h5>Where is it?</h5>
            <p>
              Nokia's Kanata campus in Tower 2. Participants will use their work
              provided computers.
            </p>

            <h5>Can I invite others?</h5>
            <p>
              Is it open to all Nokia NSP employees including Designers, QA, UX,
              Tech Comms, and Coops but not the general public.
            </p>

            <h5>Will there be prizes?</h5>
            <p>Yes, members of the top three teams will receive cash prizes.</p>

            <h5>What if I don't have any ideas?</h5>
            <p>
              Don't worry, view the <Link to="/ideas">ideas page</Link> to get
              inspiration or join an existing team.
            </p>

            <h5>What if I am inexperienced?</h5>
            <p>
              Don't worry, you will be part of a team so everyone will be able
              to contribute. We will also have a few technical advisers on hand
              if teams have questions.
            </p>

            <h5>What equipment do I have access to?</h5>
            <p>
              Users will be able to use the NSP Cloud to create basic networks
              complete with an NFM-P.
            </p>
          </div>
        </section>
      </div>
    )
  }
}

export default Home
