import React, { Component, Fragment } from "react";
import IntlMessages from "Util/IntlMessages";
import { Row, Card, CardTitle, Form, Label, Input, Button , Modal , ModalHeader, ModalBody, ModalFooter , Alert}  from "reactstrap";
import { NavLink } from "react-router-dom";

import { Colxx } from "Components/CustomBootstrap";

import { connect } from "react-redux";
import { registerUser , loadPt , loadFakultas , loadProdi , clearForm} from "Redux/actions";

import Select from "react-select";

class RegisterLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nama: "",
      email: "",
      nim:'',
      pt_id:'',
      fakultas_id:"",
      prodi_id:"",
      password: "",
      password2:"",
      gambar:"default.png",

      fakultas_pt_id :'',
      prodi_fakultas_id:'',

      modal: false

    
    };
    console.log(this.state.nama_pt) 

    this.handlePt = this.handlePt.bind(this)
    this.handleFakultas = this.handleFakultas.bind(this)
    this.handleProdi = this.handleProdi.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }
  onUserRegister() {
    // if (this.state.email !== "" && this.state.password !== "") {
    //   // this.props.registerUser(this.state, this.props.history);
    //   this.props.history.push("/");
    // }
    if(this.state.pt_id == this.state.fakultas_pt_id 
      && this.state.fakultas_id == this.state.prodi_fakultas_id 
      && this.state.nama !=="" && this.state.email !== "" && this.state.nim !== "" && this.state.password !== "" ){
      console.log('sip')
    }else {
      console.log('harus sama')
    }
    console.log(this.state)
  }

  componentDidMount() {
    document.body.classList.add("background");
    this.props.loadPt()
    // this.props.loadFakultas()
    // this.props.loadProdi()
}
  componentWillUnmount() {
    document.body.classList.remove("background");
  }
  handlePt(value){
    this.props.clearForm()
    this.setState({pt_id:value.value})
    this.props.loadFakultas({'pt_id':`${value.value}`})
  }
 
  handleFakultas(value){
    this.setState({fakultas_id:value.value , fakultas_pt_id:value.pt})
    this.props.loadProdi({'fakultas_id':`${value.value}`})

  }
  handleProdi(value){
    this.setState({prodi_id:value.value , prodi_fakultas_id:value.fakultas})
  }

  handleChange(event){
    this.setState({[event.target.name] : event.target.value})
    console.log(this.state)
  }
  handleSubmit(event){
    event.preventDefault();

    if(this.state.pt_id == this.state.fakultas_pt_id 
      && this.state.fakultas_id == this.state.prodi_fakultas_id 
      && this.state.nama !=="" && this.state.email !== "" && this.state.nim !== "" && this.state.password !== "" 
      && this.password == this.password2){

      this.props.registerUser(this.state, this.props.history)
      
      console.log('sip')
    }else {
      this.toggle()
      console.log('harus sama')
    }
    console.log(this.state)
    
  }



  render() {
    return (
      <Fragment>
        <div className="fixed-background" />
        <main>
          <div className="container">
            <Row className="h-100">
              <Colxx xxs="12" md="10" className="mx-auto my-auto">
                <Card className="auth-card">
                  <div className="position-relative image-side ">
                    <p className="text-white h2">UKM Center</p>
                    <p className="white mb-0">
                      "jalan ninjaku" <br />
                      If you are a member, please{" "}
                      <NavLink to={`/login`} className="white">
                        login
                      </NavLink>
                      .
                    </p>
                  </div>
                  <div className="form-side">
                    <div align="center">
                      <NavLink to={`/`} className="white">
                        <span className="logo-kustom" />
                      </NavLink>
                    </div>
                    <CardTitle className="mb-4">
                      <IntlMessages id="user.register" />
                    </CardTitle>

                    <Form onSubmit={this.handleSubmit}>
                      <Label className="form-group has-float-label mb-4">
                      <Input 
                          type="text"
                          name="nama"  
                          value={this.state.nama}
                          onChange={this.handleChange}
                          />
                        <IntlMessages id="user.fullname" />
                      </Label>
                      <Label className="form-group has-float-label mb-4">
                      <Input 
                          type="email" 
                          name="email" 
                          value={this.state.email}
                          onChange={this.handleChange}
                          />
                        <IntlMessages id="user.email" />
                      </Label>
                      <Label className="form-group has-float-label mb-4">
                      <Input 
                          type="text"  
                          name="nim"
                          value={this.state.nim}
                          onChange={this.handleChange}
                          />
                        <IntlMessages id="user.nim" />
                      </Label>
                      <Label className="form-group has-float-label mb-4">
                        <Select
                          options={this.props.pt.map(({id, nama_pt }) => ({value:id, label:nama_pt }))}
                          onChange={this.handlePt}
                          />
                        <IntlMessages
                          id="user.perguruan_tinggi"
                        />
                      </Label>
                      <Label className="form-group has-float-label mb-4">
                     <Select 
                        options={this.props.fakultas.map(({id, nama_fakultas}) => ({value:id, label: nama_fakultas}))}
                        onChange={this.handleFakultas}
                        />
                        <IntlMessages
                              id="user.fakultas"
                            />
                      </Label> 
                      <Label className="form-group has-float-label mb-4">
                        <Select 
                          options={this.props.prodi.map(({id, nama_prodi}) => ({value:id, label:nama_prodi}))}
                          onChange={this.handleProdi} 

                          />
                        <IntlMessages
                          id="user.program_studi"
                        />
                      </Label>
                      <Label className="form-group has-float-label mb-4">
                      <Input 
                          type="password"  
                          name="password"
                          value={this.state.password}
                          onChange={this.handleChange}
                          />
                        <IntlMessages
                          id="user.password"
                          defaultValue={this.state.password}
                        />
                      </Label>
                      <Label className="form-group has-float-label mb-4">
                      <Input 
                          type="password"  
                          name="password2"
                          value={this.state.password2}
                          onChange={this.handleChange}
                          />
                         {this.state.password != this.state.password2 ? 
                        <a><font color="red">Password don't match!</font></a> :
                        <div/>
                        }
                        <IntlMessages
                          id="user.password2"
                          defaultValue={this.state.password2}
                        />
                      </Label>
                      <div className="d-flex justify-content-end align-items-center">
                        <Button
                          color="primary"
                          className="btn-shadow"
                          size="lg"
                          // onClick={() => this.onUserRegister()}
                        >
                          <IntlMessages id="user.register-button" />
                        </Button>
                      </div>
                    </Form>
                  </div>
                </Card>
              </Colxx>
            </Row>
          </div>
        </main>

        
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>WARNING!</ModalHeader>
          <ModalBody>
              Pastikan data Anda benar!
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleSubmit}>Ok</Button>

          </ModalFooter>
        </Modal>
      </Fragment>
    );
  }
}
const mapStateToProps = ({ authUser }) => {
  const { user, loading , pt , fakultas ,prodi} = authUser;
  return { user, loading , pt ,fakultas , prodi};
};

export default connect(
  mapStateToProps,
  {
    registerUser,
    loadPt,
    loadFakultas,
    loadProdi,
    clearForm
  }
)(RegisterLayout);
