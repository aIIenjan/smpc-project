<template>
  <div class="sub-menu-bd">
      <span v-for="(v, index) in subList" v-if="subList" @click="categoryIDChange(v.contentID)">
      	{{v.contentName}}
      </span>
  </div>
</template>

<script>
export default {
	name: 'submenu',
	props: {
		subList: {
			type: Array
		}
	},
	data () {
		return {}
	},
	methods: {
        categoryIDChange (val) {
        	// alert(val)
            this.$emit('showCategoryID', val)
			this.$router.push({
				name: 'catelist',
				params: { id: val }
			})
            // this.tabindex = $index
        }
	}
}
</script>

<style>
.sub-menu-bd { position: absolute; top:0; right: 0; font-size: 0; }
.sub-menu-bd span { display: inline-block; vertical-align: middle; padding: 0 15px; border-right: #ddd 1px solid; font-size: 14px; height: 16px; line-height: 16px; }
.sub-menu-bd span:last-child { border-right: 0; padding-right: 0; }
</style>