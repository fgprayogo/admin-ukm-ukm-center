import React, { Component, Fragment } from "react";
import IntlMessages from "Util/IntlMessages";
import { Row, Card, CardTitle, Form, Label, Input, Button, Modal , ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { NavLink } from "react-router-dom";

import { Colxx } from "Components/CustomBootstrap";

import { connect } from "react-redux";
import { loginUser, loadProfile } from "Redux/actions";

class LoginLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error:'',
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
componentDidCatch(error){
  this.setState({
    error:error
  })
  
}

  handleSubmit(event){
    event.preventDefault();
    if (this.state.email !== "" && this.state.password !== "") {
      this.props.loginUser(this.state, this.props.history);
    }
    console.log(this.state.error)
    if(this.props.msg !== null){
      this.toggle()
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.msg!==this.props.msg ){
      this.toggle()
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
        <div className="kustom" />
        <main>
          <div className="container">            {/* classname container */}
            <Row className="h-100">
              <Colxx xxs="12" md="10" className="mx-auto my-auto ">
                <Card className="auth-card">
                  <div className="position-relative image-side "> {/* iki diotak atik */}
                    <p className="text-white h2"></p>
                    
                    <p className="white">
                      
                      <br />
                    </p>
                  </div>
                  <div className="form-side">
                    <div align="center">
                    <NavLink to={`/`} className="white">
                      <span className="logo-kustom"/>
                    </NavLink>
                    </div>
                    {
                      
                    }
                    <CardTitle className="mb-4">
                      <IntlMessages id="user.login-title" />
                    </CardTitle>
                    <Form onSubmit={this.handleSubmit}>
                      <Label className="form-group has-float-label mb-4">
                        <Input 
                          type="email"  
                          value={this.state.email}
                          onChange={this.handleChange}
                          />
                        <IntlMessages id="user.email" />
                      </Label>
                      <Label className="form-group has-float-label mb-4">
                        <Input 
                          type="password" 
                          value={this.state.password}
                          onChange={this.handleChange}
                          />
                        <IntlMessages
                          id="user.password"
                          // defaultValue={this.state.password}
                        />
                      </Label> 
                      {/* <a><font color="red">{this.props.msg}</font></a> */}
                      <p className="black">
                          <NavLink to={`/register`} className="blue">
                            Don't Have Account? Register
                          </NavLink>
                        </p>
                      <div className="d-flex justify-content-between align-items-center">
                        <NavLink to={`/forgot-password`}>
                          <IntlMessages id="user.forgot-password-question" />
                        </NavLink>
                        <Button
                          color="primary"
                          className="btn-shadow"
                          size="lg"
                          // onClick={this.toggle}
                          value="submit"
                          type="submit"
                        >
                          <IntlMessages id="user.login-button" />
                        </Button>
                      </div>
                    </Form>
                  </div>
                </Card>
              </Colxx>
            </Row>
          </div>
        </main>
        }
        {/* {
          this.props.msg !== null ?
          this.toggle :
          console.log('null')
        } */}
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} delay="3000">
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
  return { user, loading, profile , msg };
};

export default connect(
  mapStateToProps,
  {
    loginUser,
    loadProfile
  }
)(LoginLayout);
