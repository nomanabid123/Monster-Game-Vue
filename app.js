const getRandomValue = (max,min)=>{
return Math.floor(Math.random() * (max - min)) + min

}

const app = Vue.createApp({
    data() {
        return {
            playerHealth:100,
            monsterHealth:100,
            currentRound:0,
            winner:null,
            logMessages:[]

        }
    },
    computed:{
        monsterBarStyle(){
            if(this.monsterHealth<0) return {width:'0%'}
            return {width:this.monsterHealth+'%'}
        },
        playerBarStyle(){
            if(this.playerHealth<0) return {width:'0%'}
            return {width:this.playerHealth+'%'}
        },
        mayUseSpecialAttack(){
            return this.currentRound%3!=0
        }
        
    },
    watch:{
        playerHealth(value){
            if(value<=0 && this.monsterHealth<=0){
                this.winner='draw'
            }else if(value<=0){
                this.winner='monster'
            }   
        },
        monsterHealth(value){
            if(value<=0 && this.playerHealth<=0){
                this.winner='draw'
                this.playerHealth=0
                this.monsterHealth=0
            }else if(value<=0){
                 this.winner='player'
            }
        }
    },

    methods: {
        attackMonster(){
            this.currentRound++
            const attackValue= getRandomValue(12,5)
            this.monsterHealth -= attackValue 
            this.addLogMessage("Player","Attack",attackValue)
            this.attackPlayer()
        },
        attackPlayer(){
            const attackValue=getRandomValue(15,8)
            this.playerHealth -= attackValue
             this.addLogMessage("Monster","Attack",attackValue)
        },
        specialAttackMonster(){
            this.currentRound++
            const attackValue=getRandomValue(25,10)
             this.monsterHealth -= attackValue
              this.addLogMessage("Player","Attack",attackValue)
             this.attackPlayer()

        },
        healPlayer(){
             const healValue=getRandomValue(8,25)
             if(this.playerHealth+healValue>100){
                this.playerHealth=100
             }else{
             this.playerHealth+=healValue
             }
              this.addLogMessage("Player","Heal",healValue)
             this.attackPlayer()
        },
        startNewGame(){
            this.playerHealth=100
            this.monsterHealth=100
            this.winner=null
            this.logMessages=[]
        },
        surrender(){
            this.winner='monster'
        },
        addLogMessage(who,what,value){
            this.logMessages.unshift({
                actionBy:who,
                actionType:what,
                actionValue:value
            })
        }
    }
})

app.mount('#game')