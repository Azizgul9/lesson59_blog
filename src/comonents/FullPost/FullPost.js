import React, {Component} from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPost: null
    };

    componentDidUpdate(prevProps) {
        console.log('[FullPost] DidUpdate id=', this.props.id);

       // const BASE_URL = 'https://jsonplaceholder.typicode.com';
        if (this.props.id) {
            if(prevProps.id!==this.props.id){
            //if (!this.state.loadedPost ||(this.state.loadedPost && this.props.id !== this.state.loadedPost.id)) {
                axios.get('/posts/' + this.props.id).then(response => {
                        this.setState({loadedPost: response.data});
                    }
                );
            }
        }

    }

    render() {
        if (!this.state.loadedPost) return null;

        return (
            <div className={"FullPost"}>
                <h1>{this.state.loadedPost.title}</h1>
                <p>{this.state.loadedPost.body}</p>
                <div className="Edit">
                    <button className="delete">Delete</button>
                </div>
            </div>
        );
    }
}

export default FullPost;