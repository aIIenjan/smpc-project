<template>
	<section class="user-center wrap clearfix">
    	<usercenterleft></usercenterleft>
		<div class="user-center-ri">
			<router-view></router-view>
		</div>
	</section>
</template>

<script>
import usercenterleft from 'components/common/usercenterleft'
export default {
	components: {
		usercenterleft
	},
	data () {
		return {}
	}
}
</script>

<style scoped>
.user-center { margin: 90px auto 30px; overflow: hidden; }
.user-center-ri { float: right; width: 975px; }
</style>
