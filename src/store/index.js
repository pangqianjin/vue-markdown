import Vuex from 'vuex'
import Vue from 'vue'
import md from '../utils/md'
import {downloadString} from '../utils/save'
Vue.use(Vuex)



const state = {
    value: '', // 左侧输入的文本
    lastValues: [''],//历史输入的文本，用来撤销操作：ctrl+z
    htmlString: '',// 右侧渲染的HTML
    textareaNode: null, // textarea节点
    selectionStart:0,// 光标的开始位置
    selectionEnd: 0,// 光标的结束位置
}

const getters = {
    htmlString: state=>md.render(state.value),// 右侧渲染的HTML
    value: state=>state.value,// 左侧输入的文本
}

const mutations = {
    changeValue(state, value){
        state.value = value
    },
    clearAll(state){
        state.value = ""
    },
    save(state){
        downloadString(state.value)
    },
    setNode(state, node){
        state.textareaNode = node
    },
    setSelection(state){// 更新光标的位置
        const {selectionStart, selectionEnd} = state.textareaNode.$refs.textarea
        state.selectionStart = selectionStart
        state.selectionEnd = selectionEnd
    },
    // 添加粗体，斜体等, wrap是否包裹,
    //  wrap=true时就在光标处添加*或者用*包裹选中的内容，
    // 否则wrap=false 且 未选中内容时,直接插入char
    addStyles(state, {char1, char2, wrap=true}){
        let {value} = state
        const {selectionStart, selectionEnd} = state
        if(wrap){
            value = selectionStart===selectionEnd? 
            value.slice(0, selectionStart)+char1+char2+value.slice(selectionEnd):
            value.slice(0, selectionStart)+char1+value.slice(selectionStart, selectionEnd)+char2+value.slice(selectionEnd)
        }else if(!wrap && selectionStart===selectionEnd){// 直接在光标处添加char字符
            value = value.slice(0, selectionStart)+char1+char2+value.slice(selectionEnd)
        }      
        state.value = value
    },
    addHistory(state){
        const {lastValues} = state
        if(state.value!==lastValues[lastValues.length-1]){
            state.lastValues.push(state.value)
        }
    },
    rollback(state){
        if(state.lastValues.length>0){
            state.value = state.lastValues.pop()
        } 
    }
}

const actions = {
    changeValue({commit}, value){
        commit('changeValue', value)
    },
    clearAll({commit}){
        commit('clearAll')
    },
    save({commit}){
        commit('save')
    },
    addStyles({commit}, {char1, char2, wrap}){
        commit('setSelection')// 添加样式前先更新光标的位置
        commit('addStyles', {char1, char2, wrap})
    },
    setNode({commit}, node){
        commit('setNode', node)
    },
    addHistory({commit}, history){
        commit('addHistory', history)
    },
    rollback({commit}){
        commit('rollback')
    }
}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})