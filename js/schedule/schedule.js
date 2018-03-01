//使用localStorage存取数据
var storage = {
    save: function (key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },
    get: function (key) {
        return JSON.parse(localStorage.getItem(key)) || [];
    }
};

/*
 //模拟数据
 var listData = [
 {
 text:"上方可以添加任务信息",
 isChecked:true  //表示选中状态，true为选中，false为未选中
 },{
 text:"双击可以编辑当前信息",
 isChecked:false  //表示选中状态，true为选中，false为未选中
 }
 ];*/

//定义筛选函数，分别为全部all、未完成unfinish、完成finish
var filterListData = {
    all: function (listData) {
        return listData;
    },
    unfinish: function (listData) {
        return listData.filter(function (item) {
            return !item.isChecked;//isChecked为true表示完成，为false表示未完成。
        })
    },
    finish: function (listData) {
        return listData.filter(function (item) {
            return item.isChecked;//isChecked为true表示完成，为false表示未完成。
        })
    }
};
var listData = storage.get("schedule");//默认从localStorage中取数据
var app = new Vue({
    el: "#main",
    data: {
        listData: listData,
        addData: "",//记录需要添加的数据
        editData: "",//记录当前需要编辑的数据
        oldListData: "",//用于记录编辑前的数据，在放弃编辑时，还原使用。
        hashCode: "all"//用于记录页面hash值，过滤数据使用
    },
    watch: {
        //用于监控数据的变化，key值为需要监控的数据，数据变化调用回调函数。
        /*
         浅层监听
         listData:function(){
         storage.save("schedule",this.listData);
         }*/

        //深层监听
        listData: {
            handler: function () {
                storage.save("schedule", this.listData);
            },
            deep: true  //深层监控
        }
    },
    methods: {
        addListData: function () {
            this.listData.push({
                text: this.addData,
                isChecked: false //为新增加的数据设置此属性，并给默认值，false.
            });
        },
        deleteListData: function (item) {
            //item为绑定事件处，传过来需要删除的那条数据
            var index = this.listData.indexOf(item);
            this.listData.splice(index, 1);
        },
        editListData: function (item) {
            this.editData = item;
            this.oldListData = item.text;
        },
        updateListData: function () {
            this.editData = "";//在失去焦点的时候，取消edit，实现隐藏编辑框
        },
        cancelEditing: function (item) {
            item.text = this.oldListData;
            this.oldListData = "";
            this.editData = "";//在失去焦点的时候，取消edit，实现隐藏编辑框
        }

    },
    directives: {
        focus: {
            update: function (el, binding) {
                //el是当前操作的元素。obj是指令对象
                if (binding.value) {
                    el.focus();
                }
            }
        }
    },
    computed: {
        onChecked: function () {
            return this.listData.filter(function (item) {
                return !item.isChecked;
            }).length;
        },
        filterList: function () {
            return filterListData[this.hashCode] ? filterListData[this.hashCode](listData) : listData;
        }

    }

});


function watchHashChange() {
    var hash = location.hash.slice(1);
    app.hashCode = hash;
}
watchHashChange();
window.addEventListener("hashchange", watchHashChange);