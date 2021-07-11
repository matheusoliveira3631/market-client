<template>
  <div id='bg'>
    <div id='fg'>
      <div id='login-ctn' class='rounded d-flex flex-column'>
        <h5 class='d-flex flex-column' id='title'>
          Supermercados confiança
          <small class='text-muted'>Login</small>
          <p id='password-error' v-if="passwordError">Senha incorreta</p> 
        </h5> 
         
        <form @submit='submitForm'>
          <div id='forms-id' class='form-input' >
            <div class='icon'>
              <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/user_icon_copy.png'>
            </div>
            <input type='number' name='employee_id' id='idField' placeholder='I.D de funcionário' v-model="employeeId" @blur="blur($event.srcElement)" data-bs-toggle="tooltip" data-bs-placement="left" title="Campo vazio">
          </div>
          <div id='forms-password' class='form-input' >
            <div class='icon'>
              <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/lock_icon_copy.png'>
            </div>
            <input type='password' name='password' placeholder='Senha' v-model="password" @blur="blur($event.srcElement)" data-bs-toggle="tooltip" data-bs-placement="left" title="Campo vazio">
          </div>
          <div id='btn-container' class='d-flex'>
            <p id='employeeButton' type='submit' class='btn rounded-pill' @click="submit($event.srcElement)">Caixa</p>
            <p id='adminButton' class='btn rounded-pill' @click="submit($event.srcElement)">Administrador</p>
          </div>
        </form>
        <div id='footer'>
          <h6 class='fs-6 fw-light'>Perdeu sua senha? <a href='#'>Contate um administrador</a></h6>
        </div>
      </div>
      
    </div>
    <div id='loading-banner' class='d-flex flex-column justify-content-center align-items-center slidein slideout'>
       <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class='mt-3'>Verificando seus dados</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle'

//change later
const apiUrl = 'http://localhost:3000'

export default {
    name:'Login', 
    data: function(){
      return{
        employeeId:null,
        password:null,
        passwordError:false
      }
    },
    methods:{
      toggleClass:function(element, className){
        if (element.classList.contains(className)){
          element.classList.remove(className)
        }else{
          element.classList.add(className)
        }
      },
      toggleTooltip:function(element){
        let tooltip = new bootstrap.Tooltip(element,{
          trigger:'manual'
        })
        tooltip.show()
        setTimeout(() => {
          tooltip.hide()
        }, 2000);
      },
      toggleBanner:function(){
        const banner=document.getElementById('loading-banner')
        this.toggleClass(banner, 'slideout')
      },
      submit:async function(obj){
        let url=''
        obj.id=='employee_Button' ? url=`${apiUrl}/login` : url = `${apiUrl}/login/admin`
        if (this.employeeId && this.password){
          this.toggleBanner()
          try{
          let response = await axios.post(url ,{
            'employee_id':this.employeeId,
            'password':this.password
            
          })
            if (response.status==200){
            //redirect
            console.log('ok')
          }
          }catch{
            this.passwordError=true
            setTimeout(()=>{
              this.passwordError=false
            }, 5000)
          }
          setTimeout(()=>{
            this.toggleBanner()
          },1500)
        }
      },
      blur:function(obj){
        if (obj.name=='employee_id'){
          if (!this.employeeId){
            this.toggleTooltip(obj)
          }
        }else{
          if (!this.password){
            this.toggleTooltip(obj)
          }
        }
      }
    }
}
</script>

<style scoped>
/*animations*/

@keyframes slidein{
  from{
    transform: translateX(-100%);
  }
  to{
    transform: translateX(0%);
  }
}

@keyframes slideout{
  from{
    transform: translateX(0%);
  }
  to{
    transform: translateX(-100%);
  }
}

/*===============*/
/*general classes*/
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.separator {
  display: flex;
  align-items: center;
  text-align: center;
  width: 100%;

}

.separator::before,
.separator::after {
  content: '';
  flex: 1;
  border-bottom: .5px solid white;
}

.separator:not(:empty)::before {
  margin-right: .25em;
}

.separator:not(:empty)::after {
  margin-left: .25em;
}

.slidein{
  animation: .5s slidein;
  animation-fill-mode: forwards;
}

.slideout{
  animation: .5s slideout;
  animation-fill-mode: forwards;
}

#loading-banner{
  transform: translateX(-100%);
  position:absolute;
  top:0;
  left:0;
  z-index:1;
  height:100%;
  width: 100%;
  background: #DC6180;
}
/*===============*/ 


#bg{
  background-image: url('../assets/images/backgrounds/pexels-lisa-1855214.jpg');
  background-repeat: no-repeat;
  background-size:100vw 100vh;
  height:100vh;
  width:100vw;
}

#fg{
  height: inherit;
  width: inherit;
  background-color: rgba(0, 0, 0, 0.65);
}

#title{
  position:relative;
}

#password-error{
  position:absolute;
  top:125%;
  font-size:1rem;
  color: #DC6180
}

#login-ctn{
  background: linear-gradient(45deg, #35394a 0%, #1f222e 100%);
  position: absolute;
  height: 50%;
  width:25%;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
  padding:15px 0px;
  justify-content: space-evenly;
}

h5,h6{
  color:#afb1be;
  align-items:center;
}

h6,a{
  font-size:smaller
}

a{
  color:#606479;
}

.icon{
  position:absolute;
  left:25px;
  top:5px;
  z-index: 1;
}

.form-input{
  background:#32364a;
  position:relative;
  margin:5px 0px;
  border-top:2px solid #393d52;
  border-bottom:2px solid #393d52;
  border-left: none;
  border-right: none;

}

input{
  background:#32364a;
  padding:5px 50px;
  box-shadow:none;
  outline:none;
  border:none;
}

.btn{
  border:2px solid #DC6180;
  color:#DC6180;
  width: 50%;
  margin:10px;
}

.btn:hover{
  background: #DC6180;
  color:white;
}

#footer{
  padding: 0 10px;
}
</style>