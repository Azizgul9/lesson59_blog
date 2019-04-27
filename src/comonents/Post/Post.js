import React, {PureComponent} from 'react';
import './Post.css';

class Post extends PureComponent { //#2 eto delaet toje samoye
    componentDidMount(){
        console.log('[Post] DidMount');
    }

    componentDidUpdate(){
        console.log('[Post] DidUpdate');
    }


    //Mojem sravnit esli oni takiye ne primitivnye
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
               <article className={"Post"} onClick={this.props.clicked}>
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