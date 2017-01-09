import React from 'react';


var transitionEvent = function(){
    var t;
    var el = document.createElement('fakeelement');
    var transitions = {
        'transition':'transitionend',
        'OTransition':'oTransitionEnd',
        'MozTransition':'transitionend',
        'WebkitTransition':'webkitTransitionEnd'
    }
    for(t in transitions){
        if( el.style[t] !== undefined ){
            return transitions[t];
        }
    }
}();

export default  React.createClass({
        className:"",
        fxStyle:"",
        getInitialState:function() {
            
            return this.getCurrentState.call();
        },


        getCurrentState:function(){
            var state = {
                show:false,
                rippleList:[]
            };

            this.setState(state);
            return state;
        },
        getDefaultProps:function(){
            return {style:{}};
        },


        componentWillMount:function(){

        },
        componentDidMount:function(){
            var element = this.getDOMNode();
            element.addEventListener(transitionEvent, function(event) {
                event.target.remove();
            }.bind(this));
        },
        shouldComponentUpdate:function(nextProps, nextState){
            try{
                return (JSON.stringify([nextProps])!=JSON.stringify([this.props]) || JSON.stringify([nextState])!=JSON.stringify([this.state]) );
            }
            catch(e){
                return false;
            }
        },
        componentDidUpdate:function(){
            
                var Box = this.getDOMNode();
                var ripple = Box.getElementsByClassName(this.className)[0];
                if(ripple){
                    setTimeout(function(){
                        ripple.style.opacity = "0";
                        ripple.style.transform = "scale(1)";    
                    },100);    
                }
        },

        clickHandle:function(event){
            setTimeout(function(){
                if(this.props.onClick){
                    this.props.onClick.call();    
                }
            }.bind(this),50);
            

            var fxStyle = {
                "position": "absolute", 
                "top": "0px", 
                "left": "0px", 
                "height": "100%",
                "width": "100%", 
                "borderRadius": "50%", 
                "opacity": "0.2", 
                "backgroundColor": "rgba(0, 0, 0, 0.870588)",

                "transform": "scale(0)", 
                "transition-property":'opacity,transform',
                "transition-duration":'1.4s,0.7s',
                "transition-timing-function":'cubic-bezier(0.23, 1, 0.32, 1),cubic-bezier(0.23, 1, 0.32, 1)',
                "transition-delay":'0ms,0ms'
            }

            var el = React.findDOMNode(this);
            var elHeight = el.offsetHeight;
            var elWidth = el.offsetWidth;

            var rect = el.getBoundingClientRect();
            var offset = {};
            offset.top = rect.top + document.body.scrollTop;
            offset.left = rect.left + document.body.scrollLeft;
            var isTouchEvent = event.touches && event.touches.length;
            var pageX = isTouchEvent ? event.touches[0].pageX : event.pageX;
            var pageY = isTouchEvent ? event.touches[0].pageY : event.pageY;


            var pointerX = pageX - offset.left;
            var pointerY = pageY - offset.top;
            var topLeftDiag = this.calcDiag(pointerX, pointerY);
            var topRightDiag = this.calcDiag(elWidth - pointerX, pointerY);
            var botRightDiag = this.calcDiag(elWidth - pointerX, elHeight - pointerY);
            var botLeftDiag = this.calcDiag(pointerX, elHeight - pointerY);
            var rippleRadius = Math.max(
                topLeftDiag, topRightDiag, botRightDiag, botLeftDiag
            );
            var rippleSize = rippleRadius * 2;
            var left = pointerX - rippleRadius;
            var top = pointerY - rippleRadius;

            fxStyle.height = rippleSize+"px";
            fxStyle.width = rippleSize+"px";
            fxStyle.top = top+"px";
            fxStyle.left = left+"px";

            

            this.fxStyle = fxStyle;

            this.className = "innerCircle_"+new Date().getTime();
            var ripple =  <span  className={this.className} style={fxStyle}></span>;
            var rippleList = this.state.rippleList;
            rippleList.push(ripple);
            this.setState({rippleList:rippleList});
        },

        calcDiag:function(a, b) {
            return Math.sqrt((a * a) + (b * b));
        },

    
        render:function(){
            this.props.style.position = 'relative';
            this.props.style.overflow = "hidden";
            var props = _.clone(this.props);
            props.onClick = this.clickHandle;
            
            return  React.createElement("div", props, 
                    React.createElement("span", {class: "fxBox"}, 
                        React.createElement("span", null), 
                            this.state.rippleList.map(function(ripple,index){
                                return ripple;
                            })
                    ), 
                    React.Children.map(this.props.children, function (child) {
                        return child;
                    })
            )
        }

    });