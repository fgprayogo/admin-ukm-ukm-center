import React, { Component, Fragment } from "react";
import { injectIntl} from 'react-intl';
import {
  Row,
  Card,
  CardTitle,
  CustomInput,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ButtonDropdown,
  UncontrolledDropdown,
  Collapse,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Input,
  CardBody,
  CardSubtitle,
  CardImg,
  Label,
  CardText,
  Badge
} from "reactstrap";
import { NavLink } from "react-router-dom";
import Select from "react-select";
import CustomSelectInput from "Components/CustomSelectInput";
import classnames from "classnames";

import IntlMessages from "Util/IntlMessages";
import { Colxx, Separator } from "Components/CustomBootstrap";
import { BreadcrumbItems } from "Components/BreadcrumbContainer";

import Pagination from "Components/List/Pagination";
import mouseTrap from "react-mousetrap";
import axios from 'axios';

import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
function collect(props) {
  return { data: props.data };
}
import { servicePath } from 'Constants/defaultValues'
const apiUrl =servicePath+"/cakes/paging"

import { connect } from "react-redux";
import { getPendaftaran} from "Redux/actions";

const selectData = [
  { label: "Chocolate", value: "chocolate", key: 0 },
  { label: "Vanilla", value: "vanilla", key: 1 },
  { label: "Strawberry", value: "strawberry", key: 2 },
  { label: "Caramel", value: "caramel", key: 3 },
  { label: "Cookies and Cream", value: "cookiescream", key: 4 },
  { label: "Peppermint", value: "peppermint", key: 5 }
];


class Diterima extends Component {
  constructor(props) {
    super(props);
    this.toggleDisplayOptions = this.toggleDisplayOptions.bind(this);
    this.toggleSplit = this.toggleSplit.bind(this);
    this.dataListRender = this.dataListRender.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.getIndex = this.getIndex.bind(this);
    this.onContextMenuClick = this.onContextMenuClick.bind(this);
    this.handleSelect = this.handleSelect.bind(this)


    this.state = {
      displayMode: "list",
      pageSizes: [10, 20, 30, 50, 100],
      selectedPageSize: 10,
      categories:  [
        {label:'Cakes',value:'Cakes',key:0},
        {label:'Cupcakes',value:'Cupcakes',key:1},
        {label:'Desserts',value:'Desserts',key:2},
      ],
      orderOptions:[
        {column: "title",label: "Product Name"},
        {column: "category",label: "Category"},
        {column: "status",label: "Status"}
      ],
      selectedOrderOption:  {column: "title",label: "Product Name"},
      dropdownSplitOpen: false,
      modalOpen: false,
      currentPage: 1,
      totalItemCount: 0,
      totalPage: 1,
      search: "",
      selectedItems: [],
      lastChecked: null,
      displayOptionsIsOpen: false,
      isLoading:false,
      nama:''
    };
  }
  componentWillMount() {
    this.props.bindShortcut(["ctrl+a", "command+a"], () =>
      this.handleChangeSelectAll(false)
    );
    this.props.bindShortcut(["ctrl+d", "command+d"], () => {
      this.setState({
        selectedItems: []
      });
      return false;
    });
  }

  toggleModal() {
    this.setState({
      modalOpen: !this.state.modalOpen
    });
  }
  toggleDisplayOptions() {
    this.setState({ displayOptionsIsOpen: !this.state.displayOptionsIsOpen });
  }
  toggleSplit() {
    this.setState(prevState => ({
      dropdownSplitOpen: !prevState.dropdownSplitOpen
    }));
  }
  changeOrderBy(column) {
    this.setState(
      {
        selectedOrderOption: this.state.orderOptions.find(
          x => x.column === column
        )
      },
      () => this.dataListRender()
    );
  }
  changePageSize(size) {
    this.setState(
      {
        selectedPageSize: size,
        currentPage: 1
      },
      () => this.dataListRender()
    );
  }
  changeDisplayMode(mode) {
    this.setState({
      displayMode: mode
    });
    return false;
  }
  onChangePage(page) {
    this.setState(
      {
        currentPage: page
      },
      () => this.dataListRender()
    );
  }

  handleKeyPress(e) {
    if (e.key === "Enter") {
      this.setState(
        {
          search: e.target.value.toLowerCase()
        },
        () => this.dataListRender()
      );
    }
  }

  handleCheckChange(event, id) {
    if (
      event.target.tagName == "A" ||
      (event.target.parentElement &&
        event.target.parentElement.tagName == "A")
    ) {
      return true;
    }
    if (this.state.lastChecked == null) {
      this.setState({
        lastChecked: id
      });
    }

    let selectedItems = this.state.selectedItems;
    if (selectedItems.includes(id)) {
      selectedItems = selectedItems.filter(x => x !== id);
    } else {
      selectedItems.push(id);
    }
    this.setState({
      selectedItems
    });

    if (event.shiftKey) {
      var items = this.state.items;
      var start = this.getIndex(id, items, "id");
      var end = this.getIndex(this.state.lastChecked, items, "id");
      items = items.slice(Math.min(start, end), Math.max(start, end) + 1);
      selectedItems.push(
        ...items.map(item => {
          return item.id;
        })
      );
      selectedItems = Array.from(new Set(selectedItems));
      this.setState({
        selectedItems
      });
    }
    document.activeElement.blur();
  }

  getIndex(value, arr, prop) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i][prop] === value) {
        return i;
      }
    }
    return -1;
  }
  handleChangeSelectAll(isToggle) {
    if (this.state.selectedItems.length >= this.state.items.length) {
      if (isToggle) {
        this.setState({
          selectedItems: []
        });
      }
    } else {
      this.setState({
        selectedItems: this.state.items.map(x => x.id)
      });
    }
    document.activeElement.blur();
    return false;
  }
  componentDidMount() {
    this.dataListRender();
    this.props.getPendaftaran();
  }

  dataListRender() {

    const {selectedPageSize,currentPage,selectedOrderOption,search} = this.state;
    axios.get(`${apiUrl}?pageSize=${selectedPageSize}&currentPage=${currentPage}&orderBy=${selectedOrderOption.column}&search=${search}`)
    .then(res => {
      return res.data        
    }).then(data=>{
      this.setState({
        totalPage: data.totalPage,
        items: data.data,
        selectedItems:[],
        totalItemCount : data.totalItem,
        isLoading:true
      });
    })
  }

  onContextMenuClick = (e, data, target) => {
    console.log("onContextMenuClick - selected items",this.state.selectedItems)
    console.log("onContextMenuClick - action : ", data.action);
  };

  onContextMenu = (e, data) => {
    const clickedProductId = data.data;
    if (!this.state.selectedItems.includes(clickedProductId)) {
      this.setState({
        selectedItems :[clickedProductId]
      });
    }

    return true;
  };
  handleSelect(value){
    this.setState({nama:value.label})
    console.log(this.state.nama)
  }


  render() {
    const startIndex= (this.state.currentPage-1)*this.state.selectedPageSize
    const endIndex= (this.state.currentPage)*this.state.selectedPageSize
    const {messages} = this.props.intl;
    return (
      !this.state.isLoading?
        <div className="loading"></div>
     :
      <Fragment>
        <div className="disable-text-selection">
          <Row>
            <Colxx xxs="12">
              <div className="mb-2">
                <h1>
                  Pendaftaran Diterima
                </h1>

                <BreadcrumbItems match={this.props.match} />
              </div>

              
              <Separator className="mb-5" />
            </Colxx>
          </Row>
          
          <Row>
            {this.props.diterima.map(data => {
              // disini cek else datalist
                return (
                  <Colxx xxs="12" key={data.id} className="mb-3">
                    <ContextMenuTrigger
                      id="menu_id"
                      data={data.id}
                      collect={collect}
                    >
                      <Card
                        className={classnames("d-flex flex-row", {
                          active: this.state.selectedItems.includes(
                            data.id
                          )
                        })}
                      >
                        <div className="pl-2 d-flex flex-grow-1 min-width-zero">
                          <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                            <NavLink
                              to={{pathname:`${this.props.match.url}/${data.id}`,state:data.pendaftaran_id}}
                              className="w-40 w-sm-100"
                            >
                              <p className="list-item-heading mb-1 truncate">
                                {data.nama}
                              </p>
                            </NavLink>
                            {/* <p className="mb-1 text-muted text-small w-15 w-sm-100">
                              kategori
                            </p>
                            <p className="mb-1 text-muted text-small w-15 w-sm-100">
                              date
                            </p>
                            <div className="w-15 w-sm-100">
                              
                            </div> */}
                          </div>
                          {/* <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                            <CustomInput
                              className="itemCheck mb-0"
                              type="checkbox"
                              id={`check_${data.id}`}
                              checked={this.state.selectedItems.includes(
                                data.id
                              )}
                              onChange={() => {}}
                              label=""
                            />
                          </div> */}
                        </div>
                      </Card>
                    </ContextMenuTrigger>
                  </Colxx>
                
                );
              }
            )}
           
            {/* <Pagination
              currentPage={this.state.currentPage}
              totalPage={this.state.totalPage}
              onChangePage={i => this.onChangePage(i)}
            /> */}
            
          </Row>
        </div>

        <ContextMenu
          id="menu_id"
          onShow={e => this.onContextMenu(e, e.detail.data)}
        >
          <MenuItem
            onClick={this.onContextMenuClick}
            data={{ action: "copy" }}
          >
            <i className="simple-icon-docs" /> <span>Copy</span>
          </MenuItem>
          <MenuItem
            onClick={this.onContextMenuClick}
            data={{ action: "move" }}
          >
            <i className="simple-icon-drawer" /> <span>Move to archive</span>
          </MenuItem>
          <MenuItem
            onClick={this.onContextMenuClick}
            data={{ action: "delete" }}
          >
            <i className="simple-icon-trash" /> <span>Delete</span>
          </MenuItem>
        </ContextMenu>

        {/* <Select 
          options={this.props.pendaftaran.map(({id, nama}) => ({value:id, label:nama}))}
          onChange={this.handleSelect}
          /> */}


      </Fragment>
    );
  }
}

const mapStateToProps = ({ pendaftaranReducer}) => {
  const { diterima } = pendaftaranReducer;
  return { diterima };
};

export default connect(
  mapStateToProps,
  {
    getPendaftaran
  }
)(injectIntl(mouseTrap(Diterima)));