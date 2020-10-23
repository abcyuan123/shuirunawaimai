/*
需求：
1.随机出来数字，把数字渲染到dom(ul li)
2.还要让列表实现滚动
3.找到最小值，同时还要把最小值，放上不同的样式
4.如果最小值，在顶部，下面随机的数如果没有它小，他会一直固定在顶部
5.当出现最小值的时候，不可以重复
*/


(function () { //代码块  命名空间

    var logoNode = document.getElementById('logo');
    var closeNode = document.getElementById('close');
    var maskNode = document.getElementsByClassName('mask')[0];
    var buttonNode = document.getElementsByTagName('button')[0];
    var arrlist = [];
    var takeBox = document.getElementById('takeBox');
    var min = null;
    var minIndex = null;
    //弹窗
    logoNode.onclick = function () {
        maskNode.style.display = 'block';
        closeNode.onclick = function () {
            maskNode.style.display = 'none';
        }
    }
    // 鼠标滑过
    buttonNode.onmouseenter = function () {
        this.style.backgroundPosition = '0 ' + (-40) + 'px';
        this.onmouseleave = function () {
            this.style.backgroundPosition = '0 ' + (-0) + 'px';
        }
    }

    buttonNode.onmousedown = function () {
        this.style.backgroundPosition = '0 ' + (-80) + 'px';
        creatNum()//功能入口
        this.onmouseup = function () {
            this.style.backgroundPosition = '0 ' + (-40) + 'px';
        }
    }
    //---------------华丽的分割线-------------------


    function creatNum() {
        var someOne = Math.floor(Math.random() * 100);//随机一个100随机数
        if(someOne == min){
            creatNum();
            return; 
        }
        arrlist.push(someOne);
        console.log(arrlist)
        if (arrlist.length > 10) { //让数组保持10
            if(minIndex == 0 && someOne > min){
                //删除第二个值
                arrlist.splice(1,1);
            }else{
                arrlist.shift();
            }
            
        }
        // [1,2,3,4,4,5,6]  查找数组里的最小值 
        min = arrlist.min();//
        // console.log(min)
        minIndex = arrlist.indexOf(min);
        refurbishDom(arrlist,minIndex)//刷新dom的函数
    }

    function refurbishDom(arr,index) {


        var len = arr.length;
        var str = '';
        for (var i = 0; i < len; i++) {
            str += '<li>仍处了一个' + arr[i] + '</li>';
        }
        takeBox.innerHTML = str;
        takeBox.getElementsByTagName('li')[index].className = 'takeout';

    }
    // [2,2,3,4,5,3,1,4,5] 
    // 9xxx？
    //封装一个数组的最小值的方法
    Array.prototype.min = function () {
        var min = this[0];
        var len = this.length;
        for (var i = 0; i < len; i++) {
            if(this[i]<min){
                min = this[i]
            }
        }
        return min;

    }
})()