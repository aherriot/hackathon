import React, { Fragment } from 'react'
// import { Link } from 'react-router-dom'
// import logoURL from './nokia-logo.jpg'
import './Header.css'

const Header = ({ auth, actions }) => (
  <div className="Header">
    <div className="Header__left">Nokia NSP Hackathon 2018</div>
    <div className="Header__right">
      {auth.token ? (
        <Fragment>
          <div>{auth.name}</div>
          <button className="button button-primary" onClick={actions.logout}>
            Sign Out
          </button>
        </Fragment>
      ) : (
        <button
          className="button button-primary"
          onClick={actions.openAuthModal}>
          Sign in
        </button>
      )}
    </div>
  </div>
)

export default Header
