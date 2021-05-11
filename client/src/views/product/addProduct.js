import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import LoadingOverlay from "react-loading-overlay";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import {
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

import {
  getProducts,
  addorUpdateProduct,
  uploadImg,
} from "../../redux/product/action";
import { getColors } from "../../redux/color/action";
import { getSubCategories } from "../../redux/subcategory/action";
import { getCategories } from "../../redux/category/action";

const animatedComponents = makeAnimated();

class AddProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      sub_category: "",
      en_name: "",
      ar_name: "",
      ar_desc: "",
      en_desc: "",
      ar_treatment: "",
      en_treatment: "",
      width: "",
      height: "",
      size: "",
      price: "",
      currency_code: "",
      is_featured: false,
      stock_count: "",
      stock_alert: "",
      colors: [],
      selected_colors: [],
      custom_colors: [],
      img1: "",
      img2: "",
      category: "",
      img3: null,
      is_modal_loading: false,
      show_modal: false,
      subcategorys: [],
      categorys: [],
      errors: {},
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    this.props.getSubCategories(() => {});
    this.props.getCategories(() => {});
    this.props.getColors(() => {});
    this.setState({
      sub_category: "",
      ar_name: "",
      en_name: "",
      ar_desc: "",
      en_desc: "",
      ar_treatment: "",
      en_treatment: "",
      width: "",
      height: "",
      size: "",
      price: "",
      colors: [],
      currency_code: "",
      is_featured: false,
      stock_count: "",
      category: "",
      stock_alert: "",
      img1: null,
      img2: null,
      img3: null,
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ show_modal: nextProps.show_modal });
    this.setState({ is_modal_loading: nextProps.is_modal_loading });
    this.setState({
      colors: nextProps.colors,
      custom_colors:
        nextProps.colors && nextProps.colors.length
          ? nextProps.colors.map((item) => {
              return { value: item._id, label: item.en_name };
            })
          : [],
    });
    this.setState({ subcategorys: nextProps.subcategorys });
    this.setState({ categorys: nextProps.categorys });

    if (nextProps && nextProps.show_modal !== this.state.show_modal) {
      this.setState({
        sub_category: "",
        en_name: "",
        ar_name: "",
        ar_desc: "",
        en_desc: "",
        colors: [],
        ar_treatment: "",
        en_treatment: "",
        width: "",
        height: "",
        size: "",
        price: "",
        currency_code: "",
        is_featured: false,
        stock_count: "",
        stock_alert: "",
        category: "",
        img1: null,
        img2: null,
        img3: null,
        id: null,
      });
    }

    if (nextProps && nextProps.product && nextProps.product.en_name) {
      this.setState({
        sub_category: nextProps.product.sub_category._id,
        en_name: nextProps.product.en_name,
        ar_name: nextProps.product.ar_name,
        ar_desc: nextProps.product.ar_desc,
        en_desc: nextProps.product.en_desc,
        ar_treatment: nextProps.product.ar_treatment,
        en_treatment: nextProps.product.en_treatment,
        width: nextProps.product.width,
        height: nextProps.product.height,
        size: nextProps.product.size,
        price: nextProps.product.price,
        category: nextProps.product.category,
        selected_colors:
          nextProps.product.colors && nextProps.product.colors.length
            ? nextProps.product.colors.map((i) => {
                return { value: i.id._id, label: i.id.name };
              })
            : "",
        currency_code: nextProps.product.currency_code,
        is_featured: nextProps.product.is_featured,
        stock_count: nextProps.product.stock_count,
        stock_alert: nextProps.product.stock_alert,
        id: nextProps.product._id,
      });
    }

    if (nextProps && nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  onChangecolors = (e) => {
    this.setState({ selected_colors: e });
  };

  onFileSelect1 = (e) => {
    this.setState({ img1: e.target.files[0] });
  };

  onFileSelect2 = (e) => {
    this.setState({ img2: e.target.files[0] });
  };

  onFileSelect3 = (e) => {
    this.setState({ img3: e.target.files[0] });
  };

  uploadImage = async (field) => {
    const formData = new FormData();
    formData.append("icon", this.state[field]);
    return await this.props.uploadImg(formData);
  };

  onSubmit = async () => {
    let img1 = "";
    if (this.state.img1) {
      img1 = await this.uploadImage("img1");
    }
    let img2 = "";
    if (this.state.img2) {
      img2 = await this.uploadImage("img2");
    }
    let img3 = "";
    if (this.state.img3) {
      img3 = await this.uploadImage("img3");
    }

    let data = {};

    if (this.state.id) {
      data = {
        id: this.state.id,
        sub_category: this.state.sub_category,
        ar_name: this.state.ar_name,
        en_name: this.state.en_name,
        ar_desc: this.state.ar_desc,
        en_desc: this.state.en_desc,
        ar_treatment: this.state.ar_treatment,
        en_treatment: this.state.en_treatment,
        width: this.state.width,
        height: this.state.height,
        size: this.state.size,
        price: this.state.price,
        category: this.state.category,
        colors:
          this.state.selected_colors && this.state.selected_colors.length
            ? this.state.selected_colors.map((i) => i.value).join(",")
            : [],
        currency_code: this.state.currency_code,
        is_featured: this.state.is_featured,
        stock_count: this.state.stock_count,
        stock_alert: this.state.stock_alert,
      };
      if (img1 && img1.icon && this.state.img1) {
        data.img1 = img1.icon;
      }
      if (img2 && img2.icon && this.state.img2) {
        data.img2 = img2.icon;
      }
      if (img3 && img3.icon && this.state.img3) {
        data.img3 = img3.icon;
      }
    } else {
      data = {
        id: this.state.id,
        sub_category: this.state.sub_category,
        ar_name: this.state.ar_name,
        en_name: this.state.en_name,
        ar_desc: this.state.ar_desc,
        en_desc: this.state.en_desc,
        ar_treatment: this.state.ar_treatment,
        en_treatment: this.state.en_treatment,
        width: this.state.width,
        height: this.state.height,
        size: this.state.size,
        price: this.state.price,
        category: this.state.category,
        colors:
          this.state.selected_colors && this.state.selected_colors.length
            ? this.state.selected_colors.map((i) => i.value).join(",")
            : [],
        currency_code: this.state.currency_code,
        is_featured: this.state.is_featured,
        stock_count: this.state.stock_count,
        stock_alert: this.state.stock_alert,
        img1: img1.icon ? img1.icon : "",
        img2: img2.icon ? img2.icon : "",
        img3: img3.icon ? img3.icon : "",
      };
    }

    this.props.addorUpdateProduct(
      data,
      this.state.id ? false : true,
      this.props.toggleModalLoading,
      this.props.toggleModal,
      this.props.toggleTableLoading
    );
  };

  render() {
    const {
      sub_category,
      ar_name,
      en_name,
      ar_desc,
      en_desc,
      en_treatment,
      ar_treatment,
      width,
      height,
      size,
      price,
      currency_code,
      is_featured,
      stock_count,
      stock_alert,
      custom_colors,
      selected_colors,
      id,
      is_modal_loading,
      errors,
      show_modal,
      categorys,
      category,
      subcategorys,
    } = this.state;

    let Filteredsubcategorys =
      category && category.length
        ? subcategorys.filter((item) => item.category._id === category)
        : [];

    // console.log(Filteredsubcategorys, "Filteredsubcategorys");

    return (
      <div>
        <LoadingOverlay active={is_modal_loading} spinner text="Please Wait...">
          <Modal isOpen={show_modal} toggle={this.props.toggleModal}>
            <ModalHeader toggle={this.props.toggleModal}>
              {id ? "Update" : "Create"} Shop Items
            </ModalHeader>
            <ModalBody>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="ar_name">Arabic Name</Label>
                    <Input
                      type="text"
                      name="ar_name"
                      onChange={this.onChange}
                      id="ar_name"
                      value={ar_name}
                      placeholder="Arabic Name"
                    />
                    <p className="error">{errors && errors.ar_name}</p>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="en_name">English Name</Label>
                    <Input
                      type="text"
                      name="en_name"
                      onChange={this.onChange}
                      id="en_name"
                      value={en_name}
                      placeholder="English Name"
                    />
                    <p className="error">{errors && errors.en_name}</p>
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="category">Category</Label>
                    <Input
                      type="select"
                      name="category"
                      onChange={this.onChange}
                      id="category"
                      value={category}
                      placeholder="Featured"
                    >
                      <option value="">Select Sub Category</option>
                      {categorys &&
                        categorys.map((item, idx) => {
                          return (
                            <option value={item._id}>
                              {item.en_name} - {item.ar_name}
                            </option>
                          );
                        })}
                    </Input>
                    <p className="error">{errors && errors.category}</p>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="sub_category">Sub Category</Label>
                    <Input
                      type="select"
                      name="sub_category"
                      onChange={this.onChange}
                      id="sub_category"
                      value={sub_category}
                      placeholder="Featured"
                    >
                      <option value="">Select Sub Category</option>
                      {Filteredsubcategorys &&
                        Filteredsubcategorys.map((item, idx) => {
                          return (
                            <option value={item._id}>
                              {item.en_name} - {item.ar_name}
                            </option>
                          );
                        })}
                    </Input>
                    <p className="error">{errors && errors.sub_category}</p>
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={12}>
                  <FormGroup>
                    <Label for="ar_desc">Arabic Description</Label>
                    <Input
                      type="text"
                      name="ar_desc"
                      onChange={this.onChange}
                      id="ar_desc"
                      value={ar_desc}
                      placeholder="Arabic Description"
                    />
                    <p className="error">{errors && errors.ar_desc}</p>
                  </FormGroup>
                </Col>
                <Col md={12}>
                  <FormGroup>
                    <Label for="en_desc">English Description</Label>
                    <Input
                      type="text"
                      name="en_desc"
                      onChange={this.onChange}
                      id="en_desc"
                      value={en_desc}
                      placeholder="English Description"
                    />
                    <p className="error">{errors && errors.en_desc}</p>
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={12}>
                  <FormGroup>
                    <Label for="ar_treatment">Arabic Treatment</Label>
                    <Input
                      type="text"
                      name="ar_treatment"
                      onChange={this.onChange}
                      id="ar_treatment"
                      value={ar_treatment}
                      placeholder="Arabic Treatment"
                    />
                    <p className="error">{errors && errors.ar_treatment}</p>
                  </FormGroup>
                </Col>
                <Col md={12}>
                  <FormGroup>
                    <Label for="en_treatment">English Treatment</Label>
                    <Input
                      type="text"
                      name="en_treatment"
                      onChange={this.onChange}
                      id="en_treatment"
                      value={en_treatment}
                      placeholder="English Treatment"
                    />
                    <p className="error">{errors && errors.en_treatment}</p>
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="width">Width</Label>
                    <Input
                      type="text"
                      name="width"
                      onChange={this.onChange}
                      id="width"
                      value={width}
                      placeholder="Width"
                    />
                    <p className="error">{errors && errors.width}</p>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="height">Height</Label>
                    <Input
                      type="text"
                      name="height"
                      onChange={this.onChange}
                      id="height"
                      value={height}
                      placeholder="Height"
                    />
                    <p className="error">{errors && errors.height}</p>
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={4}>
                  <FormGroup>
                    <Label for="size">Size</Label>
                    <Input
                      type="text"
                      name="size"
                      onChange={this.onChange}
                      id="size"
                      value={size}
                      placeholder="Size"
                    />
                    <p className="error">{errors && errors.size}</p>
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="price">Price</Label>
                    <Input
                      type="text"
                      name="price"
                      onChange={this.onChange}
                      id="price"
                      value={price}
                      placeholder="Price"
                    />
                    <p className="error">{errors && errors.price}</p>
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="currency_code">Currency Code</Label>
                    <Input
                      type="text"
                      name="currency_code"
                      onChange={this.onChange}
                      id="currency_code"
                      value={currency_code}
                      placeholder="Currency Code"
                    />
                    <p className="error">{errors && errors.currency_code}</p>
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={4}>
                  <FormGroup>
                    <Label for="is_featured">Featured</Label>
                    <Input
                      type="select"
                      name="is_featured"
                      onChange={this.onChange}
                      id="is_featured"
                      value={is_featured}
                      placeholder="Featured"
                    >
                      <option value="false">No</option>
                      <option value="true">Yes</option>
                    </Input>
                    <p className="error">{errors && errors.is_featured}</p>
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="stock_count">Stock Count</Label>
                    <Input
                      type="text"
                      name="stock_count"
                      onChange={this.onChange}
                      id="stock_count"
                      value={stock_count}
                      placeholder="Stock Count"
                    />
                    <p className="error">{errors && errors.stock_count}</p>
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="stock_alert">Stock Alert</Label>
                    <Input
                      type="text"
                      name="stock_alert"
                      onChange={this.onChange}
                      id="stock_alert"
                      value={stock_alert}
                      placeholder="Stock Alert"
                    />
                    <p className="error">{errors && errors.stock_alert}</p>
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={4}>
                  <FormGroup>
                    <Label for="img1">Image 1</Label>
                    <Input
                      type="file"
                      name="img1"
                      onChange={this.onFileSelect1}
                      id="img1"
                      placeholder="Image 1"
                    />
                    <p className="error">{errors && errors.img1}</p>
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="img2">Image 2</Label>
                    <Input
                      type="file"
                      name="img2"
                      onChange={this.onFileSelect2}
                      id="img2"
                      placeholder="Image 2"
                    />
                    <p className="error">{errors && errors.img2}</p>
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="img3">Image 3</Label>
                    <Input
                      type="file"
                      name="img3"
                      onChange={this.onFileSelect3}
                      id="img3"
                      placeholder="Image 3"
                    />
                    <p className="error">{errors && errors.img3}</p>
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <Label for="colors">Colors</Label>
                <Select
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  onChange={this.onChangecolors}
                  defaultValue={selected_colors}
                  isMulti
                  options={custom_colors}
                />
                <p className="error">{errors && errors.colors}</p>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.onSubmit}>
                {id ? "Update" : "Create"}
              </Button>{" "}
              <Button color="secondary" onClick={this.props.toggleModal}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </LoadingOverlay>
      </div>
    );
  }
}

const mapDispatchToProps = (state) => {
  return {
    product: state.product.product,
    colors: state.color.colors,
    subcategorys: state.subcategory.subcategorys,
    categorys: state.category.categorys,
    errors: state.errors.errors,
  };
};

export default withRouter(
  connect(mapDispatchToProps, {
    getProducts,
    addorUpdateProduct,
    getColors,
    getSubCategories,
    uploadImg,
    getCategories,
  })(AddProduct)
);
