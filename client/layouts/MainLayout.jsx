import React from 'react';
import AccountsUI from '../AccountsUI.jsx';
import { Accounts } from 'meteor/accounts-base';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/main-layout.css';
import { Container, Col, Row } from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import {mount} from 'react-mounter';
import MyVideos from '../MyVideos.jsx';

Accounts.ui.config({
  passwordSignupFields:'USERNAME_ONLY'
})


export const MainLayout = ({content}) => (
  <div>
    <header className='header'>
      <Container>
        <Row>
            <Col lg='4'>
              <a className='header__link' href = "/">
                <img src="../images/logo.png" height="40" />
              </a>
            </Col>
            <Col lg='4' />
            <Col lg='4'>
              <div className='header__menu'>
                <a className='header__link' href = "/videos/">My Videos</a>
                <AccountsUI />
              </div>
          </Col>
        </Row>
      </Container>
    </header>
    <main className='content'>

      {content}
    </main>


  </div>
)
