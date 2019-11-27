import React, { Component, Fragment } from "react";
import IntlMessages from "Util/IntlMessages";
import { injectIntl} from 'react-intl';
import {
  Row,
  Card,
  CardBody,
  CardTitle,
  Badge,
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Progress,
  Form,
  FormGroup,
  Button,
  Label,
  Input,
  CustomInput,
  CardHeader,
  CardImg,
  CardSubtitle, CardText, Modal , ModalHeader, ModalBody, ModalFooter ,FormText
} from "reactstrap";
import Select from "react-select";
import CustomSelectInput from "Components/CustomSelectInput";
import { Link } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Colxx, Separator } from "Components/CustomBootstrap";
import BreadcrumbContainer from "Components/BreadcrumbContainer";
import { CalendarToolbar } from "Components/Calendar/CalendarToolbar";
import { PolarShadow, LineShadow, SmallLineChart } from "Components/Charts";
import {
  visitChartConfig,
  conversionChartConfig,
  lineChartConfig,
  polarChartConfig,
  smallChartData1,
  smallChartData2,
  smallChartData3,
  smallChartData4
} from "Constants/chartConfig";

import BigCalendar from "react-big-calendar";
import moment from "moment";
import ReactTable from "react-table";
import CircularProgressbar from "react-circular-progressbar";
import { Chart } from "react-chartjs-2";
import ReactSiemaCarousel from "Components/ReactSiema/ReactSiemaCarousel";
import Rating from "Components/Rating";
import DataTablePagination from "Components/DataTables/pagination";
import Sortable from "react-sortablejs";

import "chartjs-plugin-datalabels";
import "react-circular-progressbar/dist/styles.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-table/react-table.css";



import { connect } from "react-redux";
import { getProfile , updateProfile } from "Redux/actions";

import axios from 'axios'


class ProfileEdit extends Component {
  constructor(props) {
    super(props);


    this.state = {
      nama: this.props.nama,
      deskripsi_ukm: this.props.deskripsi_ukm,
      selectedFile: null
    };
    this.toggle = this.toggle.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.uploadGambar = this.uploadGambar.bind(this);

  }

toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

componentDidMount(){
  this.props.getProfile()
}
onChange(event){
  this.setState({[event.target.name] : event.target.value})
}
handleSubmit(event,history){
  event.preventDefault();
  this.props.updateProfile(this.state, this.props.history)
  console.log(this.state)


  console.log(this.state.selectedFile)
  const fd = new FormData()
  fd.append('pic', this.state.selectedFile)
  console.log(fd)
  const token = localStorage.getItem("token")
    const apiToken = {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
  if(this.state.selectedFile !== null){
    axios.put('http://127.0.0.1:3333/api/admin/foto' , fd , apiToken)
    .then(res =>
       console.log(res)
     ) 
  }
    history.push('/')
}
uploadGambar(event){
  this.setState({
    selectedFile: event.target.files[0]
  })
}


  render() {
    const {messages} = this.props.intl;
    return (
      <Fragment>
        
        <Row>
          <Colxx xxs="12">
            <BreadcrumbContainer
              heading={<IntlMessages id="dashboards.profile" />}
              match={this.props.match}
            />
            <Separator className="mb-5" />
          </Colxx>
        </Row>

      <Link to="/">  
        <h1><i className="iconsmind-Left-4" /></h1>
      </Link>

      {/* <div align="center">
        <h1>{this.props.nama}</h1>
      </div> */}
      
      <Row className="mb-4">
          <Colxx xxs="12">
            <Card>
              <CardBody>
                <div align="center">
                <CardTitle>
                  Edit Profile
                </CardTitle>
                <CardImg top src={this.props.gambar}
                alt="Card image cap" 
                className="img-thumbnail border-0 rounded-circle mb-4 list-thumbnail" />
                
                </div>
                <Form>
                  <FormGroup row>
                  <Label for="emailHorizontal" sm={2}>
                      Foto Profile 
                    </Label>
                    <Colxx sm={10}>
                    <input 
                      // style={{display:'none'}}
                      type="file" 
                      onChange={this.uploadGambar}
                      // ref={fileInput => this.fileInput = fileInput}
                      />
                      {/* <button onClick={() => this.fileInput.click()}>Edit Foto</button>
                      <button onClick={this.fileUpload}>Upload</button> */}
                    </Colxx>
                    <Label for="emailHorizontal" sm={2}>
                      Nama 
                    </Label>
                    <Colxx sm={10}>
                      <Input
                        type="text"
                        name="nama"
                        value={this.state.nama}
                        onChange={this.onChange}
                        // placeholder="edit"
                        // defaultValue={this.props.nama}
                        // placeholder={this.props.nama}
                      />
                    </Colxx>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="emailHorizontal" sm={2}>
                      Deskripsi UKM
                    </Label>
                    <Colxx sm={10}>
                      <Input 
                        type="textarea"
                        name="deskripsi_ukm"
                        value={this.state.deskripsi_ukm}
                        onChange={this.onChange}
                        // placeholder="edit"
                        // defaultValue={this.props.nim}
                      />
                    </Colxx>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="emailHorizontal" sm={2}>
                      Email
                    </Label>
                    <Colxx sm={10}>
                      <Input disabled
                        type="text"
                        name="email"
                        // placeholder="edit"
                        defaultValue={this.props.email}
                      />
                    </Colxx>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="emailHorizontal" sm={2}>
                      Perguruan Tinggi
                    </Label>
                    <Colxx sm={10}>
                      <Input disabled
                        type="text"
                        name="nama_pt"
                        // placeholder="edit"
                        defaultValue={this.props.nama_pt}
                      />
                    </Colxx>
                  </FormGroup>
{/* 
                  <FormGroup row>
                    <Label for="passwordHorizontal" sm={2}>
                      <IntlMessages id="forms.password" />
                    </Label>
                    <Colxx sm={10}>
                      <Input
                        type="password"
                        name="password"
                        id="passwordHorizontal"
                        placeholder={messages["forms.password"]}
                      />
                    </Colxx>
                  </FormGroup>

                  <FormGroup row>
                    <Label sm={2} className="pt-0">
                      <IntlMessages id="forms.radios" />
                    </Label>
                    <Colxx sm={10}>
                      <FormGroup check>
                        <Label check>
                          <Input type="radio" name="radio1" />
                          <IntlMessages id="forms.first-radio" />
                        </Label>
                      </FormGroup>
                      <FormGroup check>
                        <Label check>
                          <Input type="radio" name="radio1" />
                          <IntlMessages id="forms.second-radio" />
                        </Label>
                      </FormGroup>
                      <FormGroup check disabled>
                        <Label check>
                          <Input type="radio" name="radio1" disabled />
                          <IntlMessages id="forms.third-radio-disabled" />
                        </Label>
                      </FormGroup>
                    </Colxx>
                  </FormGroup>

                  <FormGroup row>
                    <Label sm={2} className="pt-0">
                      <IntlMessages id="forms.checkbox" />
                    </Label>
                    <Colxx sm={10}>
                      <FormGroup check>
                        <Label check>
                          <Input type="checkbox" name="check1" /> Example
                          <IntlMessages id="forms.checkbox" />
                        </Label>
                      </FormGroup>
                    </Colxx>
                  </FormGroup>
 */}
                  <div align="center">
                  <Button color="primary" onClick={this.toggle}>
                    Submit
                  </Button>
                  </div>
                  
                </Form>
              </CardBody>
            </Card>
          </Colxx>
        </Row>


        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>WARNING!</ModalHeader>
          <ModalBody>
              Apakah anda yakin ingin melakukan perubahan data?
          </ModalBody>
          <ModalFooter>
            <Button color="warning" onClick={this.toggle}>Cancel</Button>
            <Link to="/">
            <Button color="primary" onClick={this.handleSubmit}>Ok</Button>
            </Link>
          </ModalFooter>
        </Modal>
        
      </Fragment>
    );
  }
}

const mapStateToProps = ({ adminUkmReducer }) => {
  const { id, nama , deskripsi_ukm , email ,nama_pt, nama_fakultas , nama_prodi , gambar } = adminUkmReducer;
  return { id, nama , deskripsi_ukm , email ,nama_pt, nama_fakultas , nama_prodi , gambar };
};

export default connect(
  mapStateToProps,
  {
    getProfile,
    updateProfile
  }
)(injectIntl(ProfileEdit));