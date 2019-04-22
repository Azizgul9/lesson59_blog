import React, {Component, Fragment} from 'react';

import './Blog.css';
import Post from "../../comonents/Post/Post";

class Blog extends Component {

    state={
        posts: [
            // {title: 'Test Post',author: 'Jhon Doe', id:'1'},
            // {title: 'Hello, world',author: 'Jack Black', id:'2'},
            // {title: 'Another example',author: 'Jhon Doe', id:'3'},

        ],
        postsFormShown: false
    };

    constructor(props){
        super(props);
        console.log('[Blog] constructor');
        console.log('[Blog] State exist',this.state.posts.length>0);
    }

    componentDidMount(){
        console.log('[Blog] DidMount');

        fetch('https://jsonplaceholder.typicode.com/posts?_limit=4').then(response=>{
            if(response.ok){
                return response.json();
            }

            throw new Error('Something wrong with network request');
        }).then(posts=>{
            const updatedPosts=posts.map(post=>{
                return{
                    ...post,
                    author:'John Doe'
                };
            });

            this.setState({posts: updatedPosts});

        }).catch(error=>{
            console.error(error);
        })
    }

    togglePostsForm=()=>{
        this.setState(prevState=>{
            console.log('[Blog] Toggling form');
            return {postsFormShown:!prevState.postsFormShown}
        });
    };

    componentDidUpdate(){
        console.log('[Blog] DidUpdate');
    }

    render() {
        console.log('[Blog] render');

        let postsForm=null;

        if(this.state.postsFormShown){
            postsForm=<section className={"NewPost"}>New post form</section>
        }

        return (
            <Fragment>
                <section className={"Posts"}>
                    {
                        this.state.posts.map(post=>(
                          <Post
                          key={post.id}
                          title={post.title}
                          author={post.author}
                          />
                        ))
                    }
                </section>
                <button onClick={this.togglePostsForm}>New post</button>
                {postsForm}
            </Fragment>
        );
    }
}

export default Blog;