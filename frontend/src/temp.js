class app extends React.Component{
    constructor(props){
        super(props);
        this.state={
            clicks:0
        };
    }

    componentDidMount(){
        this.refs.app.addEventListener('click', this.clickHandler);
    }

    componentWillUnmount(){
        this.refs.app.removeEventListener('click', this.clickHandler);
    }

    clickHandler(){
        this.setState({
            clicks:this.clicks+1
        });
    }

    render(){
        let children = this.props.children;
        return(
            <div className="app" ref="MyAppDiv">
                <h2>({this.state.clicks}clicks)</h2>
                <h3>{this.props.headerText}</h3>
            </div>
        )
    }
}