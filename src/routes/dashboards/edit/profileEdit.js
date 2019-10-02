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
  CardSubtitle, CardText, Modal , ModalHeader, ModalBody, ModalFooter
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


class ProfileEdit extends Component {
  constructor(props) {
    super(props);


    this.state = {
      nama: this.props.nama,
      nim:this.props.nim
    };
    this.toggle = this.toggle.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

componentDidMount(){
  this.props.getProfile()
}
onChange(){
  this.setState({[event.target.name] : event.target.value})
}
handleSubmit(event,history){
  event.preventDefault();
  this.props.updateProfile(this.state, this.props.history)
  console.log(this.state)
  history.push('/')
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
                </div>
                <Form>
                  <FormGroup row>
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
                      NIM
                    </Label>
                    <Colxx sm={10}>
                      <Input 
                        type="text"
                        name="nim"
                        value={this.state.nim}
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
                  <FormGroup row>
                    <Label for="emailHorizontal" sm={2}>
                      Fakultas
                    </Label>
                    <Colxx sm={10}>
                      <Input disabled
                        type="text"
                        name="nama_fakultas"
                        // placeholder="edit"
                        defaultValue={this.props.nama_fakultas}
                      />
                    </Colxx>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="emailHorizontal" sm={2}>
                      Program Studi
                    </Label>
                    <Colxx sm={10}>
                      <Input disabled
                        type="text"
                        name="nama_prodi"
                        // placeholder="edit"
                        defaultValue={this.props.nama_prodi}
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

const mapStateToProps = ({ mahasiswaReducer }) => {
  const { id, nama , nim , email ,nama_pt, nama_fakultas , nama_prodi } = mahasiswaReducer;
  return { id, nama , nim , email ,nama_pt, nama_fakultas , nama_prodi };
};

export default connect(
  mapStateToProps,
  {
    getProfile,
    updateProfile
  }
)(injectIntl(ProfileEdit));