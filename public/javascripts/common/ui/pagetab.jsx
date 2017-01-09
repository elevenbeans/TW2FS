import ClickBox from 'ClickBox';

define(['react',"ClickBox"],function (React,ClickBox) {
	var DOM = React.DOM;
	return React.createClass({
		getDefaultProps: function () {
            return {
                tabIndex: 0,
                tabData: []
            };
        },
        getInitialState: function () {
            return {
                tabIndex: this.props.tabIndex,
                width: 0
            };
        },
        propTypes: {
            onTabChange: React.PropTypes.func.isRequired
        },
        componentDidMount: function () {
            this.resize();
            window.addEventListener('resize', this.resize, false);
        },
        componentWillUnmount: function () {
            window.removeEventListener('resize', this.resize, false);
        },
        resize: function () {
            this.setState({
                width: document.body.clientWidth-32
            });
        },
        clickItemHandle: function (index, event) {
            if (this.state.tabIndex !== index) {
                this.setState({
                    tabIndex: index
                });
            }
            this.props.onTabChange && this.props.onTabChange(index);
        },
		render:function(){
			var views = [],
                width = this.state.width,

                items = this.props.tabData.map(function (item, index) {
                if (item.view) {
                    var viewNode = DOM.div({
                        style: {'width': width + 'px',
                            'float': 'left',
  
                            'position': 'relative',
                            'visibility': this.state.tabIndex === index ? 'visible' : 'hidden'}
                    }, React.createFactory(item.view)({onHide: this.props.onHide}));
                    views.push(viewNode);
                }
                return (<ClickBox key={item.text} className={this.state.tabIndex === index ? 'tab-flex active' : 'tab-flex'}
                            onClick={this.clickItemHandle.bind(null, index)}>
                            <i className={item.iconClass}></i>{item.text}
                            </ClickBox>);
            }.bind(this));

			return(<section className="m-search clearfix">
    					<div className="srh-tab">
    						{items}
    					</div>
    					<div style={{
                            '-moz-transition-property':'transform',
                            '-o-transition-property':'transform',
                            'transition-property':'transform',
                            '-webkit-transition-property':'transform',
                            'transition-duration':'0.25s',
    	                    transform: 'translateX(-'+ this.state.tabIndex * width + 'px)',
    	                    WebkitTransform: 'translateX(-'+ this.state.tabIndex * width + 'px)',
    	                    width: width * views.length,
    	                    display: views.length ? 'block' : 'none'}}>
    	                   {views}
                        </div>
                    </section>);
		}
	});
})
