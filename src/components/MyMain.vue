<template>
    <el-row>
        <el-col :span="12" id="writing-area">
            <el-input ref="textarea" type="textarea" placeholder="请输入markdown语法"
                v-model="text" autofocus :rows="22"></el-input>
        </el-col>
        <el-col :span="12">
            <el-card class="box-card" id="preview-area">
                <div v-html="htmlString"></div>
            </el-card>
        </el-col>
    </el-row>
    
</template>
<script>
import {mapGetters, mapActions} from 'vuex'

export default {
    data(){
        return {
            text: ''
        }
    },
    mounted(){
        this.$store.dispatch('setNode', this.$refs.textarea)
    },
    computed:{
        ...mapGetters(['value','htmlString'])
    },
    methods:{
        ...mapActions(['changeValue'])
    },
    watch:{
        value(newValue){// 监视$store中的value
            this.text = newValue
        },
        text(newValue){// 监视this.text
            this.changeValue(newValue)
        }
    }
}
</script>
<style>
    #preview-area{
        min-height: 29em;
        max-height: 29em;
        overflow-y: scroll;
    }
</style>