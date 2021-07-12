<template>
<p>{{auth}}</p>
</template>

<script>
export default {
    name:'Admin',
    data:function (){
        return {
            auth:this.$store.state.authenticated
        }
    }
}
</script>

<style scoped></style>