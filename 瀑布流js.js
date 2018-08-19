//通过获取盒子的高度来获取图片的高度
/*function getchildElement(parent,content){
    var cparent=document.getElementById("parent");//此处仅获取到了父级元素，并没有获取到父级元素下的子元素
    var ccontent=document.getElementsByClassName("content");
    var allBox=[];
    for(i=0;i<ccontent.length;i++){
        if()
    }
}*/
window.onload=function(){
    img_num("container","box");    
    //添加JSON字符串
    var imgData={"data":[{"src":"1.jpg"},{"src":"2.jpg"},{"src":"3.jpg"},{"src":"4.jpg"},{"src":"5.jpg"},{"src":"6.jpg"},{"src":"7.jpg"},{"src":"8.jpg"},{"src":"9.jpg"},{"src":"10.jpg"}]}
    window.onscroll=function(){
        if(lastImg()){            
            var cparent=document.getElementById("container");
            for(var i=0;i<imgData.data.length;i++){
            var box_div=document.createElement("div");//创建HTML标签。
            box_div.className="box";//为该HTML标签添加属性。
            cparent.appendChild(box_div);
            var imgbox_div=document.createElement("div");
            imgbox_div.className="img_box";
            box_div.appendChild(imgbox_div);
            var img_create=document.createElement("img");            
            img_create.src="E:/前端/十二国记瀑布流/images/"+imgData.data[i].src;//为img标签添加src属性。            
            imgbox_div.appendChild(img_create);
            }
            img_num("container","box");
        }
    }
}
//获取所有包裹边框及图片的盒子(id="box")，并存储到数组allcontent中。
function getchildElement(parent,content){
    //var allElements=document.getElementsByTagName("*");此处获取到所有的标签，因此变量allElements是个数组
    var allElements=parent.getElementsByTagName("*");//特指parent下的所有子元素。
    var allcontent=[];
    for(var i=0;i<allElements.length;i++){
        //if(allElements[i]==content){allElements[i]是所有的标签，此处应特指是什么类型的标签与content相等
        if(allElements[i].className==content){
            allcontent.push(allElements[i]);
        }
    }
    return allcontent;
}
/*function getallHeight(parent,content){
    var cparent=document.getElementById(parent);
    var ccontent=getchildElement(cparent,content);
    for(var i=0;i<ccontent.length;i++){
        var allHeight=[];
        allHeight[i]=ccontent[i].offsetHeight;
    }
    return allHeight;
}下面通过调用getchildElement函数，已经将所有id为box的盒子取出并存放到数组ccontent中*/
function img_num(parent,content){
    var cparent=document.getElementById(parent);
    var ccontent=getchildElement(cparent,content);
    var imgWidth=ccontent[0].offsetWidth;
    var num=Math.floor(document.documentElement.clientWidth/imgWidth);//一排的图片个数
    cparent.style.cssText="width:"+imgWidth*num+"px;margin:0 auto";//设置一排的宽度并使其居中，为了固定一排的图片个数
    //获取第一排所有的图片高度
    var allHeight=[];
    for(var i=0;i<ccontent.length;i++){
        if(i<num){//这里一定要加个判断，否则获取到的数组是所有图片的高度，而并非是第一排的。
            allHeight.push(ccontent[i].offsetHeight);                        
        }else{
            var minHeight=getminHeight(allHeight);//获取第一排图片中最小的高度。
            var minLocation=getminLocation(allHeight,minHeight);//获取第一排图片中最小高度的索引。
            ccontent[i].style.position="absolute";//因为图片本身设置了浮动，因此这里需要设置绝对定位
            ccontent[i].style.top=minHeight+"px";
            //ccontent[i].style.left=allHeight[minLocation].offsetLeft+"px";此处第二排第一张的图片左边距应该是最小高度盒子的左边距
            ccontent[i].style.left=ccontent[minLocation].offsetLeft+"px";
            //minHeight=minHeight+ccontent[i].offsetHeight;这里虽然更新了最小高度，但数组allHeight中的高度并没有改变。
            allHeight[minLocation]=allHeight[minLocation]+ccontent[i].offsetHeight;
        }
    }

}
//获取数组allHeight中最小的数值及其索引。
function getminHeight(allHeight){
    var minHeight=allHeight[0];
    for(var i=1;i<allHeight.length;i++){
        if(minHeight>allHeight[i]){
            minHeight=allHeight[i];
        }
    }
    return minHeight;    
}
function getminLocation(allHeight,minHeight){
    for(var i in allHeight){
        if(allHeight[i]==minHeight){
            var minLocation=i;
        }
    }
    return minLocation;
}
function lastImg(){
    var cparent=document.getElementById("container");
    var ccontent=getchildElement(cparent,"box");
    var lastHeight=ccontent[ccontent.length-1].offsetTop;//获取包裹最后一张图片的盒子距离视窗顶部的高度。
    var scrollHeight=document.documentElement.scrollTop||document.body.scrollTop;//获取滚动条距离顶部的高度，及是滚动条滚动的距离。
    var pageHeight=document.documentElement.clientHeight||document.body.clientHeight;//获取页面高度。
    if(scrollHeight+pageHeight>lastHeight){
        return true;
    }
}
