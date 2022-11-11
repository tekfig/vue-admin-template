<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="addRules" label-width="120px">
      <el-form-item label="Task name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="Language">
        <el-select v-model="form.language" placeholder="select your language">
          <el-option label="Java" value="java" />
          <el-option label="CPP" value="cpp" />
          <el-option label="CSharp" value="csharp" />
          <el-option label="Golang" value="golang" />
          <el-option label="Kotlin" value="kotlin" />
          <el-option label="Python3" value="python" />
          <el-option label="Rust" value="rust" />
          <el-option label="Scala" value="scala" />
          <el-option label="Swift" value="swift" />
        </el-select>
      </el-form-item>
      <el-form-item label="File">
      <el-upload
        ref="upload"
        :file-list="fileList"
        class="upload-demo"
        drag
        :limit="1"
        action=""
        :before-remove="beforeRemove"
        :on-exceed="limitSize"
        :on-change="handleChange"
        :auto-upload="false">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">Please drag file here, or <em>Click to Upload</em></div>
        <div class="el-upload__tip" slot="tip">Only zip type Allowed, and less than 5MB</div>
      </el-upload>
    </el-form-item>
     <!--  <el-form-item label="Activity form">
        <el-input v-model="form.desc" type="textarea" />
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Submit Task</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { validTaskName, validTaskLanguage, validTaskFile } from '@/utils/validate'

export default {
  name: 'UploadTask',
  data() {
    const validName = (rule, value, callback) => {
      if (!validTaskName(value)) {
        callback(new Error('Please check task name'))
      } else {
        callback()
      }
    }
    const validLanguage = (rule, value, callback) => {
      if (!validTaskLanguage(value)) {
        callback(new Error('Please check task language'))
      } else {
        callback()
      }
    }
    const validFile = (rule, value, callback) => {
      if (!validTaskFile(value)) {
        callback(new Error('Please check task name'))
      } else {
        callback()
      }
    }
    return {
      form: {
        name: '',
        language: '',
        file: null
      },
      fileList: [],
      addRules: {
        name: [{ required: true, trigger: 'blur', validator: validName }],
        language: [{ required: true, trigger: 'blur', validator: validLanguage }],
        file: [{ required: true, trigger: 'blur', validator: validFile }]
      }
    }
  },
  methods: {
    limitSize() {
      this.$message({
        message: 'Only One File Allowed!',
        type: 'warning'
      })
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleChange(file, fileList) {
      this.form.file = file.raw
    },
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('task/add', this.form).then(() => {
            // this.$router.push({ path: this.redirect || '/task/list' })
            this.$message({
              message: 'upload success!,please find result on file list menu',
              type: 'success',
              duration: 5 * 1000
            })
            this.form = {
              name: '',
              language: ''
            }
            this.$refs.upload.clearFiles()
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

