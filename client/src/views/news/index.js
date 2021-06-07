import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import LoadingOverlay from "react-loading-overlay";
import {
  Card,
  CardBody,
  Row,
  Col,
  CardHeader,
  //Table,
  Button,
  Badge,
} from "reactstrap";
import moment from "moment";
import DataTable from "react-data-table-component";
import AddNews from "./addNews";
import Media from "../news-media";

import { getNews, selectNews, marknews } from "../../redux/news/action";

class News extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // OTHERS
      show_modal: false,
      selected_news: "",
      is_table_loading: false,
      is_modal_loading: false,

      // Data
      newslist: [],
      newsDetails: {},
    };
  }

  toggleModal = () => {
    this.setState({ show_modal: !this.state.show_modal, user: {} });
  };

  toggleModalLoading = () => {
    this.setState({ is_modal_loading: !this.state.is_modal_loading });
  };

  toggleTableLoading = () => {
    this.setState({ is_table_loading: !this.state.is_table_loading });
  };

  toggleNews = (news) => {
    this.setState({ selected_news: news._id, newsDetails: news });
  };

  marknews = (data) => {
    if (window.confirm("Would like to proceed with this action?")) {
      this.props.marknews(data, this.toggleTableLoading);
    }
  };

  updateRow = (news) => {
    this.toggleModal();
    if (!news) {
      this.props.selectNews({});
    } else {
      this.props.selectNews(news);
    }
  };

  componentDidMount() {
    this.props.getNews(this.toggleTableLoading);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.newslist) {
      this.setState({
        newslist: nextProps.newslist.map((item, idx) => ({
          ...item,
          index: idx + 1,
        })),
      });
    }
  }

  onCloseNews = () => {
    this.setState({ selected_news: "" });
  };

  actionFormater = (row) => {
    let item = row;
    return (
      <div>
        {/* <Button
          size="xs"
          color="warning"
          className="mr-2"
          onClick={this.updateRow.bind(this, item)}
          title="Update"
        >
          <i className="fa fa-pencil"></i>
        </Button> */}
        {!item.is_active && (
          <Button
            size="xs"
            color="success"
            className="mr-2"
            onClick={this.marknews.bind(this, {
              id: item._id,
              is_active: true,
              is_deleted: item.is_deleted,
            })}
            title="Enable Account"
          >
            <i className="fa fa-check"></i>
          </Button>
        )}
        {item.is_active && (
          <Button
            size="xs"
            color="primary"
            className="mr-2"
            onClick={this.marknews.bind(this, {
              id: item._id,
              is_active: false,
              is_deleted: item.is_deleted,
            })}
            title="Disable Account"
          >
            <i className="fa fa-times"></i>
          </Button>
        )}
        <Button
          size="xs"
          color="danger"
          className="mr-2"
          onClick={this.marknews.bind(this, {
            id: item._id,
            is_active: item.is_active,
            is_deleted: true,
          })}
          title="Delete"
        >
          <i className="fa fa-trash"></i>
        </Button>
        <Button
          size="xs"
          color="success"
          className="mr-2"
          onClick={this.toggleNews.bind(this, item)}
          title="Cities"
        >
          <i className="fa fa-list-alt"></i>
        </Button>
      </div>
    );
  };

  createdAtFormater = (row) => {
    let item = row;
    return (
      <div>
        {moment(item.createdAt).format("DD/MM/YYYY")} -{" "}
        {moment(item.createdAt).fromNow()}
      </div>
    );
  };

  iconFormator = (row) => {
    return (
      <Fragment>
        {row.icon ? (
          <img src={row.icon} alt={row.en_name} style={{ maxWidth: "75px" }} />
        ) : (
          ""
        )}
      </Fragment>
    );
  };

  statusFormat = (row) => {
    let item = row;
    return item.is_active ? (
      <Badge color="primary" outline>
        Active
      </Badge>
    ) : (
      <Badge color="danger" outline>
        Inactive
      </Badge>
    );
  };

  render() {
    const {
      is_table_loading,
      is_modal_loading,
      newsDetails,
      newslist,
      show_modal,
      selected_news,
    } = this.state;

    const columns = [
      {
        name: "Id",
        selector: "index",
        maxWidth: "50px",
      },
      {
        name: "Icon",
        selector: "icon",
        format: this.iconFormator,
      },
      {
        name: "Header",
        selector: "header",
      },
      {
        name: "Created At",
        selector: "created_at",
        format: this.createdAtFormater,
        minWidth: "200px",
      },
      {
        name: "Status",
        selector: "status",
        format: this.statusFormat,
      },
      {
        name: "Actions",
        selector: "id",
        format: this.actionFormater,
        minWidth: "250px",
      },
    ];

    return (
      <div>
        <Row>
          <AddNews
            show_modal={show_modal}
            is_modal_loading={is_modal_loading}
            toggleModal={this.toggleModal}
            toggleModalLoading={this.toggleModalLoading}
            toggleTableLoading={this.toggleTableLoading}
          />
          <Col md={selected_news ? "6" : "12"}>
            <LoadingOverlay
              active={is_table_loading}
              spinner
              text="Please Wait..."
            >
              <Card>
                <CardHeader>
                  News List
                  <Button
                    size="xs"
                    color="success"
                    className="mr-2 float-right"
                    onClick={this.updateRow.bind(this, false)}
                  >
                    <i className="fa fa-plus" alt="Update"></i>
                  </Button>
                </CardHeader>
                <CardBody>
                  <DataTable
                    noHeader={true}
                    columns={columns}
                    data={newslist}
                    pagination
                  />
                </CardBody>
              </Card>
            </LoadingOverlay>
          </Col>
          {selected_news && (
            <Col md={selected_news ? "6" : "12"}>
              <Media
                news={selected_news}
                newsDetails={newsDetails}
                closeSection={this.onCloseNews}
              />
            </Col>
          )}
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    news: state.news.news,
    newslist: state.news.newslist,
  };
};

export default withRouter(
  connect(mapStateToProps, { getNews, selectNews, marknews })(News)
);
