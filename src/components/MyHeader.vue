<template>
  <el-row>
    <el-col :span="1">
      <el-button icon="el-icon-download" type="primary" @click="save"></el-button>
    </el-col>
    <el-col :span="1" :offset="1">
      <el-button
        icon="el-icon-delete-solid" type="primary" @click="clearAll"></el-button>
    </el-col>
    <el-col :span="1" :offset="1">
      <el-button @click="addStyles({char1:'**',char2:'**',wrap:true})"><strong>B</strong></el-button>
    </el-col>
    <el-col :span="1" :offset="1">
      <el-button @click="addStyles({char1:'*',char2:'*',wrap:true})"><i>I</i></el-button>
    </el-col>
    <el-col :span="1" :offset="1">
      <el-button @click="addStyles({char1:'<u>',char2:'</u>',wrap:true})">下划线</el-button>
    </el-col>
    <el-col :span="1" :offset="1">
      <el-button @click="addStyles({char1:'```\n\n',char2:'```',wrap:false})">代码块</el-button>
    </el-col>
    <el-col :span="1" :offset="1">
      <el-button @click="addStyles({char1:'<!-- ',char2:' -->',wrap:false})">注释</el-button>
    </el-col>
    <el-col :span="1" :offset="1">
      <el-button icon="el-icon-picture" @click="addStyles({char1:'![ ]( )',char2:'',wrap:false})"></el-button>
    </el-col>
    <el-col :span="1" :offset="1">
      <el-button icon="el-icon-link" @click="addStyles({char1:'[ ]( )',char2:'', wrap:false})"></el-button>
    </el-col>
  </el-row>
</template>
<script>
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions(['addStyles',"save", "clearAll"]),
  },
};
</script>
<style>
</style>