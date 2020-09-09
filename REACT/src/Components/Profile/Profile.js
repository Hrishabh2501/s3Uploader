import React from "react";
import Toast from 'light-toast';
import axios from "axios";
import {
  Redirect
} from "react-router-dom";
import {
  Container as ReactContainer,
  Row as ReactRow,
  Col as ReactCol
} from "react-grid";
import "./Profile.css";
import Popup from "reactjs-popup";
import { getData, deleteData, uploadData } from "../../APIs/API";
const regex = new RegExp('[^.]+$');

const styles = {
  breakpoints: { xs: 0, sm: 576, md: 768, lg: 992, xl: 1200 },
  containerMaxWidths: { sm: 540, md: 720, lg: 960, xl: 1140 },
  columns: 2,
  gutterWidth: 30,
};
export const Container = (props) => (
  <ReactContainer {...props} styles={styles} />
);
export const Row = (props) => <ReactRow {...props} styles={styles} />;
export const Col = (props) => <ReactCol {...props} styles={styles} />;



export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    const uInfo = JSON.parse(localStorage.getItem('token'))
    this.state = {
      firstname: uInfo.data.firstName || this.props.location.state.firstName,
      lastname: uInfo.data.lastName || this.props.location.state.lastName,
      mail: uInfo.data.email || this.props.location.state.email,
      uid: uInfo.data.id || this.props.location.state.id,
      submit: false,
      selectedFile: null,
      date: new Date(),
      dataList: []
    };
    this.handleLogout = this.handleLogout.bind(this);
  }

  async getdata() {

    // console.log(this.state.mail)
    let gData = await getData(this.state.uid)
    console.log(gData)
    if (gData.data.success) {
      this.setState({ dataList: gData.data.data })
      this.setState({ submit: false })
    }

  }

  async componentDidMount() {
    this.getdata()

  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.dataList !== this.state.dataList) {
      this.setState({})
    }
    // console.log(prevState, this.state.dataList)
  }

  handleLogout = async () => {

    let self = this;
    let res = await axios.post("http://localhost:8000/signout", {
      email: this.state.mail,
    });
    if (res.data.success) {
      // console.log(res.data.message);
      localStorage.removeItem("token")
      Toast.fail(res.data.message, 500)
      self.setState({
        submit: true,
        // firstname: "",
        // lastname: "",
        // mail: "",
      });
      // self.setState({ submit: true });
    }
  };



  onFileUpload = async (ev) => {
    ev.preventDefault();

    // console.log(this.uploadInput.files.length)

    const data = new FormData();

    for (let i = 0; i < this.uploadInput.files.length; i++) {
      data.append('file', this.uploadInput.files[i]);
    }
    data.append('email', this.state.mail)

    let self = this
    Toast.loading('Uploading file...')

    let uploaddata = await uploadData(data)
    console.log('$$$$$$$', uploaddata)
    // console.log('$$$$$$$')

    if (uploaddata.data.success) {
      Toast.hide()
      this.setState({ dataList: this.state.dataList })
      document.getElementById("uploader").value = "";
      // setTimeout(function () { self.getdata() }, 5000);
      self.getdata()
    }

  }

  onDelete = async (item) => {
    let user = {
      email: this.state.mail,
      delete: item
    }
    let updatedList = await deleteData(user)
    if (updatedList.data.success) {
      this.setState({ submit: false })
      let gData = await getData(this.state.uid)
      this.setState({ dataList: gData.data.data })
    }
  }

  render() {
    let uData = this.state.dataList
    return (

      <div>
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container" style={{ textTransform: "uppercase" }}>
            <img src={process.env.PUBLIC_URL + '/aws-s3-icon.png'} style={{ blockSize: '1.5cm' }} alt='s3' />

            Welcome &nbsp;{" "}
            <b>
              <i>{this.state.firstname}</i>
            </b>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <div className="navbar-nav ml-auto">

                <Popup trigger={<button className="btn btn-primary btn-block">LOGOUT</button>} position="bottom left" >
                  <div style={{ textAlign: 'center' }}><i>ARE YOU SURE?</i></div>
                  <div style={{ textAlign: 'center' }}><button className="btn btn-primary" onClick={this.handleLogout} >Yes</button></div>
                </Popup>

              </div>
            </div>
          </div>
        </nav>

        <div className="profileHeader" >
          <form onSubmit={this.onFileUpload} >
            <div>

              UPLOAD FILE:{" "}
              <input
                type="file"
                multiple={true}
                className="btn btn-primary "
                id="uploader"
                accept=".png, .jpeg, .jpg, .pdf, .doc, .mp3"
                ref={(ref) => {
                  this.uploadInput = ref;
                }}
              />

              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <button className="btn btn-primary">UPLOAD TO s3</button>
            </div>
          </form>
          <br></br>
          <br></br>
          <div>
            <div>
              <Container fluid className="cont">

                <Row className="rowHead">
                  <Col ><b>FILE NAME</b></Col>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Col ><b>FILE TYPE</b></Col>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Col ><b>FILE SIZE</b></Col>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Col ><b>UPLOADED ON</b></Col>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Col><b>ACTION</b></Col>
                </Row>

                {uData.map((item, key) =>
                  <Row className="rowData">
                    <Col >
                      {item.fType === 'image/png' || item.fType === 'image/jpeg'  ?
                        <Popup trigger={<img src={item.file} style={{ blockSize: '1cm' }} alt={item.fType}></img>} on='hover' position="right top">
                          <img src={item.file} style={{ blockSize: '10cm', border: '0.2cm solid black' }} alt={item.fType}></img>
                        </Popup> : <img src={process.env.PUBLIC_URL + '/pdf.png'} style={{ blockSize: '1cm' }} alt={item.fType}></img>}
                      {/* <Popup trigger={<img src={item.file} style={{ blockSize: '1cm' }} alt={item.fType}></img>} on='hover' position="right top">
                        <img src={item.file} style={{ blockSize: '10cm', border: '0.2cm solid black' }} alt={item.fType}></img>
                      </Popup> */}
                      <span> {item.fName}</span></Col>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Col > {item.fType}</Col>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Col >{item.fSize}</Col>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Col >{item.fDate}</Col>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Col>
                      <a href={item.file}>
                        <img src={process.env.PUBLIC_URL + '/download.png'} style={{ blockSize: '0.5cm' }} alt='Download' /></a> &nbsp;&nbsp;
                    <Popup trigger={<img src={process.env.PUBLIC_URL + '/delete.png'} id="overlay" style={{ blockSize: '0.5cm' }} alt='Delete' />} on='hover' position="bottom right" >
                        <div style={{ textAlign: 'center' }}><i>ARE YOU SURE?</i></div>
                        <div style={{ textAlign: 'center' }}><button className="btn btn-primary" onClick={() => { this.onDelete(item.fName) }} >Yes</button></div>
                      </Popup>
                    </Col>
                  </Row>
                )}

              </Container>

            </div>
          </div>
        </div>
        {this.state.submit ? <Redirect to={`/signin`} /> : null}
      </div>
    );
  }
}


