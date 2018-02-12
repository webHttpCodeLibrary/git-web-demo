//获取所有DOM元素
var oBanner = document.getElementById("banner"),
	oScroll = oBanner.children[0],
	oUl = oScroll.children[0],
	oLi = oUl.children,
	oOl = oScroll.children[1],
	oLis = oOl.children,	
	oBtn = oBanner.children[1],
	oLeft = oBtn.children[0],
	oRight = oBtn.children[1],
	imgWidth = oScroll.offsetWidth,
	timer = null;
	var pic = 0;


	// console.log(oLis);


//封装遍历数字按钮函数
function forBtn(obj,index){

	for(var j = 0; j < obj.length; j++){
		oLis[j].style.background = "#fff";
	}

	obj[index].style.background = "yellow";
}


window.onload = function(){	

	//动态创建数字按钮
	for(var i = 0; i < oLi.length; i++){
		var olLi = document.createElement("li");
		olLi.innerHTML = i + 1;		
		oOl.appendChild(olLi);
	}	
	oLis[0].style.background = "yellow";

	//给数字按钮注册事件
	for(var i = 0; i < oLis.length; i++){
		var btn = oLis[i];
			btn.index = i;
		btn.onmouseover = function(){
			// for(var j = 0; j < oLis.length; j++){
			// 	oLis[j].style.background = "#fff";
			// }

			// this.style.background = "yellow";
			pic = this.index;
			forBtn(oLis,pic);
			var target = -this.index * imgWidth;
			// oUl.style.left = -step + "px";
			animate(oUl,{"left": target});
		}
	}


	//封装自动滚动函数
	function playGo(){
		if(pic == oLi.length - 1){					
			oUl.style.left = 0;	
			pic = 0;					
		}
			pic++;
			console.log(pic);			
			var target = -pic * imgWidth;			
			animate(oUl,{"left":target});
			//避免影响pic的值另外弄个变量接收值后传参，因为滚动到最后一张跳转时会影响
			var rPic = pic == oLi.length - 1 ? 0 : pic;		
			forBtn(oLis,rPic);
			// console.log(pic);
	}



	//动态将第一张图添加到最后一张
	var lastLi = oLi[0].cloneNode(true);
	oUl.appendChild(lastLi);

	//左右焦点图实现	
	// 左边按钮
	oLeft.onclick = function(){	

		if(pic == 0){					
			oUl.style.left = -(oLi.length - 1) * imgWidth + "px";	
			pic = oLi.length - 1;			
			// console.log(imgWidth);			
		}
			pic--;			
			var target = -pic * imgWidth;			
			animate(oUl,{"left":target});
			forBtn(oLis,pic);			
	}

	//右边按钮
	oRight.onclick = function(){
		
		playGo();	
	}

	//自动滚动
	timer = setInterval(function(){
			playGo();
	},1000);

		//鼠标划入按钮显示
	oBanner.onmouseover = function(){
		oBtn.style.display = "block";
		clearInterval(timer);
	}
	//鼠标移除按钮隐藏
	oBanner.onmouseout = function(){
		oBtn.style.display = "none";
		timer = setInterval(function(){
			playGo();
		},1000);
	}


}

	





