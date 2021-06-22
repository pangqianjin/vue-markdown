<template>
    <el-row>
        <el-col :span="12" id="writing-area">
            <el-input ref="textarea" type="textarea" placeholder="请输入markdown语法"
                @keyup.native="handleKeyupCtrl($event)"
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
        this.timer = setInterval(()=>{// 每3s对比,并决定是否记录历史输入(逻辑在store中)
            this.addHistory()
        },3000)
    },
    beforeDestroy(){
        clearInterval(this.timer)
    },
    computed:{
        ...mapGetters(['value','htmlString'])
    },
    methods:{
        ...mapActions(['addStyles','changeValue', 'addHistory','rollback']),
        handleKeyupCtrl(event){
            switch(event.keyCode){
                case 90:// ctrl+Z
                    this.rollback()
                    break
                case 66:// ctrl+B
                    this.addStyles({char1:'**',char2:'**',wrap:true})
                    break
                case 73://ctrl+I
                    this.addStyles({char1:'*',char2:'*',wrap:true})
                    break
            }
        }
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