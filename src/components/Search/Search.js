import React,{Component} from 'react';
import { Grid,Input,Image,Segment,Button,Pagination } from 'semantic-ui-react';
import { BrowserRouter, Link, Route } from 'react-router';
import '../../styles/Search.css';
import artistlogo from '../../artists-logo.png';
import LinkButton from '../LinkButton.js';
import small_img from '../../artist.jpg';

var api = require("../../Api/api.js");

class Layout extends Component {
  constructor(props){
    super(props);
    this.state = { value: '',results:[],message:''};
  }

  searchartist(){
    let _this = this;
    var artist_name = document.getElementById("searchartist").value;

    fetch(api.search+artist_name)
    .then((response) => response.json())
    .then((responseData) => {
      console.log("responseData",responseData);
      if(responseData){
        var artistdata = responseData['artists'];
        var message = artistdata ? '' : 'No Results found';
        _this.setState({
          results: artistdata,
          message : message
        });
      }
    }).catch(function(error){
      console.log("error",error);
    });
  }

  renderData(){
    return this.state.results.map(row => {
      return(
        <Grid className="result_section" key={row.idArtist}>
          <Grid.Column width={4}>
            <Image src={small_img} size="medium"  alt="artists" />
          </Grid.Column>
          <Grid.Column textAlign='left'  width={9}>
            <h1>{row.strArtist}</h1>
            <LinkButton to={`/album/${row.strArtist}`} >View Albums</LinkButton>
          </Grid.Column>
          <Grid.Column width={3}>
          </Grid.Column>
        </Grid>
      )
    });
  }
  render(){
    const { isLoading, value, results } = this.state
    return(
      <Grid centered verticalAlign='middle'>
        <Grid.Column width={8}>
          <div>
            <Image src={artistlogo} size="medium" centered  alt="artists" />
            <Input onChange={e => console.log(e.target.value)} id="searchartist" fluid size="large" placeholder='Search Artists...'  action={<Button content='Search' onClick={this.searchartist.bind(this)} />} />
          </div>
          <div>
            {this.state.results ? this.renderData() : ''}
            <h1 className="error_message">
              {this.state.message ? this.state.message : ''}
            </h1>
            {this.state.results ? <Pagination pageitem={this.state.results}  /> : ''}
          </div>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Layout;
