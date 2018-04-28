import React,{ Component } from 'react';
import '../../styles/Album.css';
import _ from 'lodash';
import { Grid,Image,Button,Modal,Header,Icon,Pagination } from 'semantic-ui-react';
import Artist from '../../artist.jpg';
import AlbumImage from '../../music_artist.jpeg';

var api = require("../../Api/api.js");

class Album extends Component {
  constructor(props){
    super(props);
    this.state={ artistname: props.match.params.name,modalOpen: false,viewtrack: false,artistdata:[]}
  }
  componentDidMount(){
    fetch(api.searchallalbum+this.state.artistname)
    .then((response) => response.json())
    .then((responseData) => {
      console.log("responseData",responseData);
      if(responseData){
        var artistdata = responseData['album'];
        this.setState({
          artistdata : artistdata
        });
      }
    }).catch(function(error){
      console.log("error",error);
    });
  }
  viewtrack(row){
    fetch(api.searchtract_byalbumid+row.idAlbum)
    .then((response) => response.json())
    .then((responseData) => {
      if(responseData){
        var trackdata = responseData['track'];
        this.setState({
          trackdata : trackdata,
          viewtrack : true,
          albumName: row.strAlbum,
          released: row.intYearReleased,
          activealbum : row
        });
      }
    }).catch(function(error){
      console.log("error",error);
    });
  }
  renderRowdata(){
    return this.state.artistdata.map( row => {
      return (
        <Grid className="result_section" key={row.idAlbum}>
          <Grid.Column width={4}>
            <Image src={AlbumImage} size="small"  alt="artists" />
          </Grid.Column>
          <Grid.Column textAlign='left' width={10}>
            <h1>{row.strAlbum}</h1>
            <Modal trigger={<Button content='View Tracks' onClick={this.viewtrack.bind(this,row)} />}  closeIcon >
              <Modal.Header>
                <div>
                  <span>{this.state.albumName}</span>
                  <span>{this.state.released}</span>
                </div>
              </Modal.Header>
              <Modal.Content scrolling>
                <Modal.Description>
                  {this.state.trackdata && this.state.trackdata.map( row => {
                    return (
                      <Grid className="result_section" key={row.idTrack}>
                        <Grid.Column width={4}>
                          <h2>{row.strTrack}</h2>
                        </Grid.Column>
                        <Grid.Column textAlign='left' width={10}>
                          <h1>{'04: 30'}</h1>
                        </Grid.Column>
                        <Grid.Column width={2}>

                        </Grid.Column>
                      </Grid>
                    )
                  })}
                </Modal.Description>
              </Modal.Content>
            </Modal>
          </Grid.Column>
          <Grid.Column width={2}>

          </Grid.Column>
        </Grid>
      )
    })
  }
  render(){
    var data = this.state.artistdata;
    if(data.length){
      return(
        <Grid centered vertical-align="middle">
          <Grid.Row>
            <Grid.Column>
            </Grid.Column>
            <Grid.Column width={3}>
              <Image src={Artist} size={'medium'} />
            </Grid.Column>
            <Grid.Column width={6}>
              <h1>{this.state.artistname}</h1>
            </Grid.Column>
            <Grid.Column>
            </Grid.Column>
          </Grid.Row>
          <div>
            <h1 className="album_section">Albums</h1>
            {this.renderRowdata()}
            {this.state.artistdata ? <Pagination pageitem={this.state.artistdata}  /> : ''}
          </div>
        </Grid>
      )
    }else{
      return(
        <div>
          No Data Available
        </div>
      )
    }

  }
}

export default Album;
