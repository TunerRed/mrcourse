define(function (require) {


    function DragBox(dom) {
        this.dragBoxDom = dom;
        this.sceneDom = dom.getElementsByClassName("drag-box__scene")[0];
        this.containerDom = dom.getElementsByClassName("drag-box__container")[0];
    }
    DragBox.prototype = {
        show:function (txt) {
            this.containerDom.innerHTML = txt;
        },
        clear:function () {
            while (!this.containerDom.firstChild.classList.contains("drag-box__bottom-bar")){
                this.containerDom.removeChild(this.containerDom.firstChild);
            }
            while (this.sceneDom.firstChild){
                this.sceneDom.removeChild(this.sceneDom.firstChild);
            }
        },
        add:function (_) {
            for (var i in arguments){
                this.containerDom.insertBefore(arguments[i],this.containerDom.lastChild)
            }
        },
        getContainerDom:function () {
            return this.containerDom;
        }
    }

    function Switcher(dom) {
        this.dom = dom;
        this.onDom = dom.querySelector(".switcher__on");
        this.offDom = dom.querySelector(".switcher__off");
    }
    Switcher.prototype = {
        toggle:function () {
            this.dom.classList.toggle("on");
        },
        turnOn:function () {
            this.dom.classList.add("on");
        },
        turnOff:function () {
            this.dom.classList.remove("on");
        },
        isOn:function () {
            return this.dom.classList.contains("on");
        }
    }


    function TabSwitcher(dom) {
        this.titleDom = dom.getElementsByClassName("tab-switcher__title");
        this.contentDom = dom.getElementsByClassName("tab-switcher__content");
    }
    TabSwitcher.prototype = {
        init:function () {
            var titleUl = this.titleDom,
                contentUl = this.contentDom;
            this.titleLi = [];
            this.contentLi = [];

            for (var i in titleUl){
                if (titleUl[i].nodeType === 1 && titleUl[i].nodeName === "LI")
                    this.titleLi.add(titleUl[i])
            }
            for (var i in contentUl){
                if (contentUl[i].nodeType === 1 && contentUl[i].nodeName === "LI")
                    this.contentLi.add(contentUl[i])
            }
        },
        switchTo:function (i) {
            this.titleLi.forEach(function (item) {
                item.classList.remove("active");
            });
            this.contentLi.forEach(function (item) {
                item.classList.remove("active");
            });
            this.titleLi[i].classList.add("active");
            this.contentLi[i].classList.add("active");
        }
    }


    return{
        DragBox:DragBox,
        Switcher:Switcher,
        TabSwitcher:TabSwitcher
    }
})