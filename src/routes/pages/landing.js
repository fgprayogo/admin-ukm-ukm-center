import React, { Component, Fragment } from "react";
import IntlMessages from "Util/IntlMessages";
import { Row, Card, CardTitle, Form, Label, Input, Button, Modal , ModalHeader, ModalBody, ModalFooter , Jumbotron , Container } from "reactstrap";
import { NavLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

import { Colxx } from "Components/CustomBootstrap";

import { connect } from "react-redux";
import { loginUser, loadProfile } from "Redux/actions";

import Particles from 'react-particles-js';

//test
class LoginLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  handleSubmit(event){
    event.preventDefault();
    if (this.state.email !== "" && this.state.password !== "") {
      this.props.loginUser(this.state, this.props.history);
    }
    
  }
  handleChange(event){
    this.setState({[event.target.type] : event.target.value})
  }

  componentDidMount() {
    document.body.classList.add("background");
    console.log(this.props.msg)
  }
  componentWillUnmount() {
    document.body.classList.remove("background");
  }
  componentDidUpdate(){
 
    console.log(this.props.msg)
    
  }
  msgRender(){
    return <div>
      <h1>Password Email salah</h1>
    </div>
  }

  
  

  render() {
    return (
      <Fragment>
        
        {/* <nav className="navbar" >

        </nav> */}
        <div className="kustom"/>
        <main>
          
          <div className="container">
          <Row className="h-100">
            <Colxx xs="6" className="mx-auto my-auto">
            <Jumbotron>
                  <h1 className="display-3">UKM Center</h1>
                  <p className="lead">Kelola UKM mu dengan cara modern!</p>
                  <p className="lead">
                    <NavLink to="/login">
                      <Button color="primary">Masuk</Button>
                    </NavLink>
                  </p>
                </Jumbotron>
            </Colxx>
            <Colxx xs="6" className="mx-auto my-auto">
            <Particles relatives
              params={{
            		particles: {
            			line_linked: {
            				shadow: {
            					enable: true,
            					color: "white",
            					blur: 1
            				}
            			}
            		}
            	}}
            />
            </Colxx>
          </Row>
            {/* <Row className="h-100">
              <Colxx xxs="12" md="10" className="mx-auto my-auto">
                
              </Colxx>
            </Row> */}
          </div>
        </main>

        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>WARNING!</ModalHeader>
          <ModalBody>
              Periksa kembali Email dan Password Anda!
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Ok</Button>
            
          </ModalFooter>
        </Modal>

  
      </Fragment>
    );
  }
}
const mapStateToProps = ({ authUser }) => {
  const { user, loading, profile, msg } = authUser;
  return { user, loading, profile , msg};
};

export default connect(
  mapStateToProps,
  {
    loginUser,
    loadProfile
  }
)(LoginLayout);
