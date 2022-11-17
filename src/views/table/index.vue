<template>
  <div class="app-container">
    <el-form ref="paramsInfo"  label-width="120px">
      <el-form-item label="Task name">
        <el-input v-model="paramsInfo.taskName" width="200px"/>
      </el-form-item>
      <el-form-item label="Language">
        <el-select v-model="paramsInfo.language" clearable placeholder="select your language">
          <el-option label="Java" value="Java" />
          <el-option label="CPP" value="CPP" />
          <el-option label="CSharp" value="CSharp" />
          <el-option label="Golang" value="Golang" />
          <el-option label="Kotlin" value="Kotlin" />
          <el-option label="Python3" value="Python3" />
          <el-option label="Rust" value="Rust" />
          <el-option label="Scala" value="Scala" />
          <el-option label="Swift" value="Swift" />
          <el-option label="Scheme" value="Scheme" />
          <el-option label="Rlang" value="Rlang" />
          <el-option label="Emf" value="Emf" />
          <el-option label="Text" value="Text" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handlePage">Search</el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      :row-class-name="tableRowClassName"
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column label="FileName" width="300">
        <template slot-scope="scope">
          {{ scope.row.fileName }}
        </template>
      </el-table-column>
      <el-table-column label="TaskName" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.taskName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Language" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.language }}
        </template>
      </el-table-column>
      <el-table-column label="Similarity" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.avgValue }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Status" width="130" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="task_time" width="200">
        <template slot-scope="scope">
          <!-- <i class="el-icon-time" /> -->
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        class-name="status-col"
        label="Operation"
        width="120">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.status==='SUCCESS'"
            type="text"
            size="small"
            @click.native.prevent="viewResult(scope.row.taskId, scope.$index)">
            Download Detail
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @current-change="handlePage"
        layout="prev, pager, next"
        :page-size.sync="paramsInfo.pageSize"
        :current-page.sync="paramsInfo.pageNo"
        :total="paramsInfo.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getList } from '@/api/table'
import { result } from '@/api/task'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      paramsInfo: {
        total: 0,
        // current: 1,
        pageNo: 1,
        pageSize: 5,
        taskName: '',
        language: ''
      }
    }
  },
  created() {
    this.fetchData(this.paramsInfo)
  },
  methods: {
    fetchData(paramsInfo) {
      this.listLoading = true
      getList(paramsInfo).then(response => {
        this.list = response.data.records
        this.paramsInfo.total = response.data.total
        this.listLoading = false
      })
    },
    handlePage() {
      // console.log(this.paramsInfo)
      getList(this.paramsInfo).then(response => {
        this.list = response.data.records
        this.paramsInfo.total = response.data.total
        // this.paramsInfo.current = response.data.current
        this.listLoading = false
      })
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.status === 'PROCESSING') {
        return 'warning-row'
      } else if (row.status === 'SUCCESS') {
        return 'success-row'
      }
      return ''
    },
    viewResult(taskId, rowIndex) {
      result(taskId).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/zip' }))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', `result`)
        // link.download = response.headers['filename']
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
      }).then(res => {
        const link = document.createElement('a')
        link.href = 'https://jplag.github.io/JPlag/'
        link.target = '_blank'
        link.click()
      })
    }
  }
}
</script>
<style>
  .el-table .warning-row {
    background: rgb(253, 230, 239);
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
