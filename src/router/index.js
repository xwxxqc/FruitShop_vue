import VueRouter from "vue-router";
import Vue from "vue";
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import CustomerMessage from '../components/CustomerMessage.vue'
import CustomerHistory from '../components/CustomerHistory.vue'
import SaleRecord from '../components/SaleRecord.vue'
import DailyCost from '../components/DaliyCost.vue'
import Debt from '../components/Debt.vue'
import CostData from '../components/CostData.vue'
import Stock from '../components/Stock.vue'
import Distributed from '../components/Distributed.vue'
import IntoRecord from '../components/IntoRecord.vue'
import StockManager from '../components/StockManager.vue'
import UserMessage from '../components/UserMessage.vue'
import AuthorityManage from '../components/AuthorityManage.vue'
import GoodsMessage from '../components/GoodsMessage.vue'
import SaleMessage from '../components/SaleMessage.vue'
import GoodsData from '../components/GoodsData'
import Begin from '../components/Begin.vue'

Vue.use(VueRouter)

const router = new VueRouter({
    routes:[
        {
            path:'/',
            component:Login
        },
        {
            path:'/home',
            component:Home,
            redirect:'/begin',
            children:[
                {
                    path:'/begin',
                    component:Begin
                },
                {
                    path:'/customermessage',
                    component:CustomerMessage
                },
                {
                    path:'/customerhistory',
                    component:CustomerHistory
                },
                {
                    path:'/salerecord',
                    component:SaleRecord
                },
                {
                    path:'/daliycost',
                    component:DailyCost
                },
                {
                    path:'/debt',
                    component:Debt
                },
                {
                    path:'/costdata',
                    component:CostData
                },
                {
                    path:'/stock',
                    component:Stock
                },
                {
                    path:'/distributed',
                    component:Distributed
                },
                {
                    path:'/intorecord',
                    component:IntoRecord
                },
                {
                    path:'/stockmanager',
                    component:StockManager
                },
                {
                    path:'/usermessage',
                    component:UserMessage
                },
                {
                    path:'/authoritymanage',
                    component:AuthorityManage
                },
                {
                    path:'/goodsmessage',
                    component:GoodsMessage
                },
                {
                    path:'/salemessage',
                    component:SaleMessage
                },
                {
                    path:'/goodsdata',
                    component:GoodsData
                }
            ]
        }
    ]
})

router.beforeEach((to,from,next)=>{
    const token=window.localStorage.getItem("TOKEN");
    if(to.fullPath=='/'){
        next()
    }
    if(token){
        next()
    }
})

export default router