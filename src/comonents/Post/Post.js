import React, {PureComponent} from 'react';
import './Post.css';

class Post extends PureComponent {
    componentDidMount(){
        console.log('[Post] DidMount');
    }

    componentDidUpdate(){
        console.log('[Post] DidUpdate');
    }

    // shouldComponentUpdate(nextProps,nextState){
    //     console.log('[Post] SHouldUpdate');
    //
    //     return nextProps.title!==this.props.title ||
    //         nextProps.author!==this.props.author;
    // }

    render() {
        console.log('[Post] render');
        return (
            <div>
               <article className={"Post"}>
                   <h1>{this.props.title}</h1>
                   <div className="Info">
                       <div className="Author">
                           {this.props.author}
                       </div>
                   </div>
               </article>
            </div>
        );
    }
}

export default Post;