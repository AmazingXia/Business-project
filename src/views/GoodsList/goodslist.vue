<template>
  <div class="good-list">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-input placeholder="请输入内容"
                  v-model="searchText"
                  class="input-with-select"
                  @input="handleSearch">
          <el-button slot="append"
                     icon="el-icon-search"
                     @click="handleSearch"></el-button>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary"
                   @click="$router.push('/addgoodslist')">添加商品</el-button>
      </el-col>
    </el-row>
    <el-table v-loading="loading"
              ref="multipleTable"
              :data="goodsDataArr"
              tooltip-effect="dark"
              style="width: 100%"
              border
              stripe>
      <el-table-column label="序号"
                       type="index"
                       width="40">
        <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
      </el-table-column>
      <el-table-column prop="goods_name"
                       label="商品名称"
                       width="100">
      </el-table-column>
      <el-table-column prop="goods_price"
                       label="商品价格"
                       width="180">
      </el-table-column>
      <el-table-column prop="goods_state"
                       label="商品状态"
                       width="100">
      </el-table-column>
      <el-table-column label="商品重量"
                       width="80"
                       prop="goods_weight">

      </el-table-column>
      <el-table-column label="操作时间"
                       width="120"
                       prop="upd_time">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary"
                     icon="el-icon-edit"
                     size="mini"
                     @click="$refs.userEditEL.handelEditUser(scope.row)"></el-button>
          <el-button size="mini"
                     type="success"
                     icon="el-icon-check"
                     @click="$refs.roleEditEl.handelPartUserShow(scope.row)"></el-button>
          <el-button size="mini"
                     type="danger"
                     icon="el-icon-delete"
                     @click="handleDeleteUser(scope.row)"></el-button>
        </template>
      </el-table-column>
      <!-- <el-table-column
        label="操作"
        width="240"
      >
        <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
        <el-button type="success" icon="el-icon-check" size="mini"></el-button>
        <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
      </el-table-column> -->
    </el-table>
    <el-pagination @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="currentPage"
                   :page-sizes="[ 5, 10, 15, 20]"
                   :page-size="pageSize"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="Total">
    </el-pagination>
  </div>
</template>
<script>
import { getGoodsList } from '@/api/goods-list'
export default {
  name: 'GoodsList',
  created () {
    this.getGoodsAllList()
  },
  data () {
    return {
      searchText: '',
      Total: 0,
      currentPage: 1,
      pageSize: 15,
      loading: false,
      goodsDataArr: []
    }
  },
  methods: {
    handleSearch () {
      this.currentPage = 1
      this.getGoodsAllList()
    },
    handleSizeChange (p) {
      this.pageSize = p
      this.currentPage = 1
      this.getGoodsAllList()
    },
    handleCurrentChange (p) {
      // console.log(p);
      this.currentPage = p
      this.getGoodsAllList()
    },

    async getGoodsAllList () {
      this.loading = true
      const { query, pagenum, pagesize } = { query: this.searchText, pagenum: this.currentPage, pagesize: this.pageSize }
      const { data, meta } = await getGoodsList({ query, pagenum, pagesize })
      if (meta.status === 200) {
        this.goodsDataArr = data.goods
        // console.log(data)
        // goods: (5) [{…}, {…}, {…}, {…}, {…}, __ob__: Observer]
        // pagenum: "1"
        // total: 943
        this.Total = data.total
        this.loading = false
      }
    }
  }
}
</script>
<style scoped>
.good-list {
  height: 100%;
}
</style>
