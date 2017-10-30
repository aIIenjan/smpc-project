<template>
	<div class="pagination-bd clearfix">
		<!-- <el-pagination
			@size-change="handleSizeChange"
        	@current-change="handleCurrentChange"
			layout="total, sizes, prev, pager, next"
			:current-change="1"
			:page-sizes="[12, 18, 24, 30]"
			:page-size="pagesize"
			:total="count"
			:key=""
		>
		</el-pagination> -->
		<el-pagination
			@size-change="handleSizeChange"
        	@current-change="handleCurrentChange"
			layout="total, prev, pager, next"
			:current-change="1"
			:page-size="pagesize"
			:total="count"
			:key=""
		>
		</el-pagination>
	</div>
</template>

<script>
export default {
	name: 'pagination',
	props: {
		bannerData: {
			type: Array
		},
		count: {
			type: Number
		}
	},
	data () {
		return {
			pagesize: this.GLOBAL.config.pagesize
		}
	},
	mounted () {
	},
	methods: {
		handleSizeChange(val) {
			this.$emit('showCurrentSizeChange',val)
		},
		handleCurrentChange (val) {
			this.$emit('showCurrentPage',val)
		}
	}
}
</script>

<style>
.pagination-bd { text-align: center; }
.el-pagination .el-pager li { margin: 0 5px; border-radius: 3px; font-size: 16px; padding: 0 10px; }
.pagination-bd .el-pagination .btn-prev, .el-pagination .el-pager li, .el-pager li.active+li, .pagination-bd .el-pagination .btn-next { font-size: 16px; border-right: 1px solid #d1dbe5; border-left: 1px solid #d1dbe5; border-radius: 3px; }
.el-pager li.active { border-color: #ff9c01; background: #ff9c01; }
</style>