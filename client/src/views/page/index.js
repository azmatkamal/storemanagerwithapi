import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import LoadingOverlay from "react-loading-overlay";
import { Editor } from "@tinymce/tinymce-react";
import {
  Card,
  CardBody,
  Row,
  Col,
  CardHeader,
  FormGroup,
  Label,
  Button,
} from "reactstrap";

import { getPage, addorUpdatePage } from "../../redux/page/action";

const API_KEY = "gp6mxy72dyy66lvp5vm6ztavcvitbobj294zp2c1ub5g96xs";

class AddCountry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      privacy: "",
      terms: "",
      ar_privacy: "",
      ar_terms: "",
      is_loading: false,
      errors: {},
    };
  }

  is_loading = (e) => {
    this.setState({ is_loading: !this.state.is_loading });
  };

  onChangePrivacy = (e) => {
    this.setState({ privacy: e });
  };

  onChangePrivacyAR = (e) => {
    this.setState({ ar_privacy: e });
  };

  onChangeTerms = (e) => {
    this.setState({ terms: e });
  };

  onChangeTermsAR = (e) => {
    this.setState({ ar_terms: e });
  };

  componentDidMount() {
    this.setState({ terms: "", privacy: "", ar_terms: "", ar_privacy: "" });
    this.props.getPage(this.is_loading);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.page) {
      this.setState({
        privacy: nextProps.page.privacy || "",
        terms: nextProps.page.terms || "",
        ar_privacy: nextProps.page.ar_privacy || "",
        ar_terms: nextProps.page.ar_terms || "",
        id: nextProps.page._id || null,
      });
    }

    if (nextProps && nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  onFileSelect = (e) => {
    this.setState({ icon: e.target.files[0] });
  };

  onSubmit = () => {
    const formData = new FormData();
    formData.append("id", this.state.id);
    formData.append("terms", this.state.terms);
    formData.append("privacy", this.state.privacy);
    formData.append("ar_terms", this.state.ar_terms);
    formData.append("ar_privacy", this.state.ar_privacy);

    this.props.addorUpdatePage(formData, this.is_loading);
  };

  render() {
    const {
      terms,
      privacy,
      ar_privacy,
      ar_terms,
      is_loading,
      errors,
    } = this.state;

    return (
      <div>
        <LoadingOverlay active={is_loading} spinner text="Please Wait...">
          <Card>
            <CardHeader>Manage Pages</CardHeader>
            <CardBody>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="terms">Terms & Condition</Label>
                    <Editor
                      apiKey={API_KEY}
                      value={terms}
                      onEditorChange={this.onChangeTerms}
                      init={{
                        menubar: false,
                        branding: false,
                        statusbar: false,
                        height: "250px",
                        plugins:
                          "table colorpicker spellchecker hr link textcolor print noneditable  lists",
                        toolbar:
                          "styleselect | bold italic underline forecolor | alignleft aligncenter alignright | bullist numlist | outdent indent  ",
                      }}
                    />
                    <p className="error">{errors && errors.terms}</p>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="ar_terms">Terms & Condition (Arabic)</Label>
                    <Editor
                      apiKey={API_KEY}
                      value={ar_terms}
                      onEditorChange={this.onChangeTermsAR}
                      init={{
                        menubar: false,
                        branding: false,
                        statusbar: false,
                        height: "250px",
                        directionality: "rtl",
                        plugins:
                          "table colorpicker spellchecker hr link textcolor print noneditable  lists",
                        toolbar:
                          "styleselect | bold italic underline forecolor | alignleft aligncenter alignright | bullist numlist | outdent indent  ",
                      }}
                    />
                    <p className="error">{errors && errors.ar_terms}</p>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="privacy">Privacy & Policy</Label>
                    <Editor
                      apiKey={API_KEY}
                      value={privacy}
                      onEditorChange={this.onChangePrivacy}
                      init={{
                        menubar: false,
                        branding: false,
                        statusbar: false,
                        height: "250px",
                        plugins:
                          "table colorpicker spellchecker hr link textcolor print noneditable  lists",
                        toolbar:
                          "styleselect | bold italic underline forecolor | alignleft aligncenter alignright | bullist numlist | outdent indent  ",
                      }}
                    />
                    <p className="error">{errors && errors.privacy}</p>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="ar_privacy">Privacy & Policy (Arabic)</Label>
                    <Editor
                      apiKey={API_KEY}
                      value={ar_privacy}
                      onEditorChange={this.onChangePrivacyAR}
                      init={{
                        menubar: false,
                        branding: false,
                        statusbar: false,
                        directionality: "rtl",
                        height: "250px",
                        plugins:
                          "table colorpicker spellchecker hr link textcolor print noneditable  lists",
                        toolbar:
                          "styleselect | bold italic underline forecolor | alignleft aligncenter alignright | bullist numlist | outdent indent  ",
                      }}
                    />
                    <p className="error">{errors && errors.ar_privacy}</p>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <Button color="primary" onClick={this.onSubmit}>
                    Update
                  </Button>{" "}
                </Col>
              </Row>
            </CardBody>
          </Card>
        </LoadingOverlay>
      </div>
    );
  }
}

const mapDispatchToProps = (state) => {
  return {
    page: state.page.page,
    errors: state.errors.errors,
  };
};

export default withRouter(
  connect(mapDispatchToProps, { getPage, addorUpdatePage })(AddCountry)
);
