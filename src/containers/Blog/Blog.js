import React, {Component, Fragment} from 'react';
import axios from 'axios';

import './Blog.css';
import Post from "../../comonents/Post/Post";
import FullPost from "../../comonents/FullPost/FullPost";

class Blog extends Component {

    state = {
        posts: [
            // {title: 'Test Post',author: 'Jhon Doe', id:'1'},
            // {title: 'Hello, world',author: 'Jack Black', id:'2'},
            // {title: 'Another example',author: 'Jhon Doe', id:'3'},

        ],
        postsFormShown: false,
        selectedPostId: null
    };

    constructor(props) {
        super(props);
        console.log('[Blog] constructor');
        console.log('[Blog] State exist', this.state.posts.length > 0);
    }

    // _makeRequest(url) {
    //     return fetch(url).then(response => {
    //         if (response.ok) {
    //             return response.json();
    //         }
    //
    //         throw new Error('Something went wrong with network request');
    //
    //     });
    //
    // }

    componentDidMount() {
        //const BASE_URL = 'https://jsonplaceholder.typicode.com';
        const POSTS_URL = '/posts?_limit=4';
        const USER_URL = '/users/';

        axios.get(POSTS_URL).then(response => {
            return Promise.all(response.data.map(post => {
                return axios.get(USER_URL + post.userId).then(response => {
                    return {...post, author: response.data.name};
                });
            }));

        }).then(posts => {
            this.setState({posts});
        }).catch(error => {
            console.log(error);
        });

    }

    togglePostsForm = () => {
        this.setState(prevState => {
            console.log('[Blog] Toggling form');
            return {postsFormShown: !prevState.postsFormShown}
        });
    };

    componentDidUpdate() {
        console.log('[Blog] DidUpdate');
    }

    postSelectedHandler = id => {
        this.setState({selectedPostId: id});
    };

    render() {
        console.log('[Blog] render');

        let postsForm = null;

        if (this.state.postsFormShown) {
            postsForm = <section className={"NewPost"}>New post form</section>
        }

        return (
            <Fragment>
                <section className={"Posts"}>
                    {
                        this.state.posts.map(post => (
                            <Post
                                key={post.id}
                                title={post.title}
                                author={post.author}
                                clicked={()=>this.postSelectedHandler(post.id)}
                            />
                        ))
                    }
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId}/>
                </section>
                <button onClick={this.togglePostsForm}>New post</button>
                {postsForm}
            </Fragment>
        );
    }
}

export default Blog;