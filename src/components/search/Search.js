/* eslint-disable react/jsx-no-undef */
import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem'
import SelectField from 'material-ui/SelectField';
import axios from 'axios';
import ImageResult from '../image-results/ImageResults'


class Search extends Component {

    state={
        searchText : '',
        amount: 10 ,
        apiUrl : 'https://pixabay.com/api',
        apiKey : '11608977-c0cb60ce05eb9af95729ddd66',
        images:[]
    };

    onTextChange = (e) =>{
        this.setState({[e.target.name] : e.target.value},() =>{
            axios.get(`${this.state.apiUrl}/?key=${this.state.apiKey}&q=${this.state.searchText}&image_type=photo&per_page=${this.state.amount}&safesearch=true`)
                .then(res => this.setState({images : res.data.hits}))
                .catch(err => console.log("error"))
        })
    };
    onAmountChange = (e , index , val) => this.setState({amount : val});

    render() {
        console.log(this.state)
        return (
            <div>
                <TextField
                name="searchText"
                value={this.state.searchText}
                onChange={this.onTextChange}
                floatingLabelText="Search for images"
                fullWidth={true}
                />
                <br/>

                <SelectField
                    name="amount"
                    floatingLabelText="Amount"
                    value={this.state.amount}
                    onChange={this.onAmountChange}
                >

                    <MenuItem value={10} primaryText="10"/>
                    <MenuItem value={20} primaryText="20"/>
                    <MenuItem value={30} primaryText="30"/>
                </SelectField>
                <br />
                {this.state.images.length > 0 ? (<ImageResult image={this.state.images}/>) : null}
                
            </div>
        );
    }
}

export default Search;