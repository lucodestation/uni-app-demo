<template>
	<view>
		<view class="u-loading u-loading-circle"  ></view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			
		},
		computed: {
			// 加载中圆圈动画的样式
			cricleStyle() {
				let style = {};
				style.width = 100 + 'rpx';
				style.height = 100 + 'rpx';
				style.borderColor = `#e4e4e4 #e4e4e4 #e4e4e4 ${this.color ? this.color : '#c7c7c7'}`;
				return style;
			},
		},
		methods: {
			
		}
	}
</script>

<style>

.u-loading-circle {
		/* #ifndef APP-NVUE */
		display: inline-flex;
		/* #endif */
		vertical-align: middle;
		width: 100rpx;
		height: 100rpx;
		background: 0 0;
		border-radius: 50%;
		border: 8rpx solid;
		border-color: #FFFFFF #FFFFFF #FFFFFF #FFFFFF;
		animation: u-circle 5s linear infinite;
	}
	@-webkit-keyframes u-circle {
		0% {
			
			transform: rotate(0);
			border-color: #FFFFFF #FFFFFF #FFFFFF #FFFFFF;
		}
		25%{
			transform: rotate(90deg);
			border-color: #5555ff #FFFFFF #FFFFFF #FFFFFF;
		}
		50%{
			transform: rotate(180deg);
			border-color: #5555ff #5555ff #FFFFFF #FFFFFF;
		}
		75%{
			transform: rotate(270deg);
			border-color: #5555ff #5555ff #5555ff #FFFFFF;
		}
		100% {
			transform: rotate(360deg);
			border-color: #5555ff #5555ff #5555ff #5555ff;
		}
	}
</style>