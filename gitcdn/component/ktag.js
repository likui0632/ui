var ktag = `
<div >
				<div class="flex f-lr wh bg-8 j-5 x  pl-2 pr-2 cor-8 tm-6">
								<div class="font-2 pl-2 pr-2">技术支持:{{content}}</div>
				</div>
</div>

`
var ktag= {
	template: ktag,
	props: { //这里是组件可以接受的参数，也就是相当于面向原型写组件时的配置参数，用户可以传递不同参数，自己定义组件
		content: { //卡片标题
			type: String,
			default: ''
		},

	},
	data() {
		return {
					
		}
	},
}