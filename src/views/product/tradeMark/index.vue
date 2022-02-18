<template>
  <div>
    <el-button type="primary" icon="el-icon-plus" @click="addTradeMark"
      >添加</el-button
    >
    <el-dialog
      :title="tmform.id ? '修改品牌' : '添加品牌'"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="tmform" :rules="rules" ref="ruleForm">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input
            autocomplete="off"
            style="width: 80%"
            v-model="tmform.tmName"
          ></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="tmform.logoUrl" :src="tmform.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdataTradeMark"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <el-table border style="width: 100%; margin-top: 20px" :data="list">
      <el-table-column label="序号" width="80" type="index"></el-table-column>
      <el-table-column
        prop="tmName"
        label="品牌名称"
        width="180"
      ></el-table-column>
      <el-table-column label="品牌LOGO">
        <!-- 作用域插槽 -->
        <template slot-scope="{ row }">
          <img :src="row.logoUrl" style="width: 100px" />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="{ row }">
          <el-button
            type="warning"
            size="mini"
            icon="el-icon-edit"
            @click="updataTradeMark(row)"
            >修改</el-button
          >
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="deleteTradeMark(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="textAlign: center"
      @size-change="sizeChange"
      @current-change="getTradeMarkList"
      :current-page="page"
      :page-sizes="[3, 5, 10]"
      :page-size="limit"
      layout="prev,pager,next,jumper,->,sizes,total"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "TradeMark",
  data() {
    return {
      //当前页
      page: 1,
      //一页共有几条数据
      limit: 5,
      //总数
      total: 0,
      //数据
      list: [],
      //dialog的显示与隐藏
      dialogFormVisible: false,
      //品牌信息
      tmform: {
        logoUrl: "",
        tmName: "",
      },
      //表单验证规则
      rules: {
        tmName: [
          { required: true, message: "请输入品牌名称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2到 10个字符",
            trigger: "change",
          },
        ],
        logoUrl: [{ required: true, message: "请上传图片" }],
      },
    };
  },
  mounted() {
    this.getTradeMarkList();
  },
  methods: {
    async getTradeMarkList(currentPage = 1) {
      this.page = currentPage;
      const { page, limit } = this;
      const result = await this.$API.tradeMark.reqTradeMarkList(page, limit);
      if (result.code == 200) {
        this.list = result.data.records;
        this.total = result.data.total;
      }
    },
    sizeChange(size) {
      this.limit = size;
      this.getTradeMarkList();
    },
    addTradeMark() {
      this.tmform = {
        logoUrl: "",
        tmName: "",
      };
      this.dialogFormVisible = true;
      this.$refs.ruleForm.resetFields();
    },
    updataTradeMark(row) {
      this.dialogFormVisible = true;
      this.$refs.ruleForm.resetFields();
      this.tmform = { ...row };
    },
    handleAvatarSuccess(res, file) {
      this.tmform.logoUrl = res.data;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //dialog对话框点击确认按钮的回调
    addOrUpdataTradeMark() {
      this.$refs.ruleForm.validate(async (success) => {
        if (success) {
          this.dialogFormVisible = false;
          const result = await this.$API.tradeMark.reqAddOrUpdateTradeMark(
            this.tmform
          );
          if (result.code == 200) {
            this.$message(
              this.tmform.id
                ? {
                    message: "恭喜你，修改成功",
                    type: "success",
                  }
                : {
                    message: "恭喜你，商品添加成功",
                    type: "success",
                  }
            );
            this.getTradeMarkList(this.tmform.id ? this.page : 1);
          } else {
            this.$message.error(result.data);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //删除品牌
    deleteTradeMark(row) {
      this.$confirm(`确定要删除${row.tmName}?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const result = await this.$API.tradeMark.reqDeleteTradeMark(row.id);
          if (result.code == 200) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getTradeMarkList(this.list.length>1?this.page:this.page-1)
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style >
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>