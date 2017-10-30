<template>
    <div class="tabItems">
        <div class="Tab_tittle_wrap" @click="tabswitch">
            <span v-for="(v,i) in tabTitle" :style="{width:(100/tabTitle.length-7.5)+'%'}" :class="isShowTab==i?'router-link-active':''">{{v}}<i></i></span>
        </div>
        <div class="Tab_item_wrap">
            <slot></slot>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                tabTitle: [],
                isShowTab: 0,
            }
        },
        created: function() {
            let is = sessionStorage.getItem("isTabShow");
            if(is) {
                this.isShowTab = is;
            } else {
                let URL = libUtils.GetURLParamObj();
                this.isShowTab = URL.isShowTab ? URL.isShowTab : "0";
            }

            setTimeout(function() {
                this.tabswitch(document.querySelector(".Tab_tittle_wrap").children[this.isShowTab].click());
            }.bind(this), 0);
        },
        mounted() {
            let slot = this.$slots.default;
            for(let i = 0; i < slot.length; i++) {
                if(slot[i].tag == "div") {
                    this.tabTitle.push(slot[i].data.attrs.name);
                    if(slot[i].elm) {
                        slot[i].elm.className = "hide";
                        if(this.isShowTab == i) {
                            slot[i].elm.className = "";
                        }
                    };
                }
            }
        },
        methods: {
            tabswitch() {
                if(!event) return;
                let target = event.target;

                if(target.nodeName.toLowerCase() !== 'span') {
                    return;
                }

                let len = target.parentNode.children;
                for(let i = 0; i < len.length; i++) {
                    len[i].index = i;
                    len[i].removeAttribute('class');
                }
                target.setAttribute('class', 'router-link-active');
                this.isShowTab = target.index;

                //tabItems
                let child = this.$el.children[1].children;
                for(let k = 0; k < child.length; k++) {
                    child[k].className = "hide";
                    if(k == target.index) {
                        child[k].className = "showAnminous";
                    }
                }
                try {
                    sessionStorage.setItem("isTabShow", target.index);
                } catch(err) {
                    console.log(err);
                }
            }
        }
    }
</script>