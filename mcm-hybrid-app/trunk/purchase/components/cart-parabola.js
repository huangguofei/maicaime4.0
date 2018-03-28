Vue.component("cart-parabola", {
	template : '<div class="cart-parabold">'+
				 '<div v-for="ball in balls">'+
				     '<transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">'+
				         '<div class="ball" :class="type == \'often\' ? \'ball-often\' : \'ball-cart\'" v-show="ball.show">'+
				             '<slot></slot>'+
				         '</div>'+
				     '</transition>'+
				 '</div>'+
				'</div>',
	data : function() {
		return {
			balls : [
				{
					 show: false	
				},
				{
					 show: false	
				},
				{
					 show: false	
				},
				{
					 show: false	
				},
				{
					 show: false	
				}
			],
			dropBalls:[],
		}
	},
	props : {
        type : {
            type : String,
            default : null
        }
    },
	methods : {
		drop: function(el){
             for(var i=0;i<this.balls.length;i++){
                 var ball= this.balls[i];
                 if(!ball.show){
                     ball.show = true;
                     ball.el=el;
                     this.dropBalls.push(ball);
                     return;
                 }
             }
             
         },
         beforeDrop: function(el) {
             var count = this.balls.length;
             while (count--) {
                 var ball = this.balls[count];
                 if (ball.show) {
                     var rect = ball.el.getBoundingClientRect(); 
                     var x = rect.left - 155;
                     var y = -(window.innerHeight - rect.top - 5); 
                     el.style.display = '';
                     el.style.webkitTransform = 'translateY('+y+'px)';  
                     el.style.transform = 'translateY('+y+'px)';
                     var inner = el.getElementsByClassName('inner-hook')[0];
                     inner.style.webkitTransform = 'translateX('+x+'px)';
                     inner.style.transform = 'translateX('+x+'px)';
                 }
             }
         },
         dropping: function(el, done) {
             var rf = el.offsetHeight;
             el.style.webkitTransform = 'translate3d(0,0,0)';
             el.style.transform = 'translate3d(0,0,0)';
             var inner = el.getElementsByClassName('inner-hook')[0];
             inner.style.webkitTransform = 'translate3d(0,0,0)';
             inner.style.transform = 'translate3d(0,0,0)';
             el.addEventListener('transitionend', done);
         },
         afterDrop: function(el) {
             var ball = this.dropBalls.shift();
             if (ball) {
                 ball.show = false;
                 el.style.display = 'none';
             }
		}
	}
})