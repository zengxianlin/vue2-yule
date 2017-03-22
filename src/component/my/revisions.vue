<template>
    <div class="revisions">
        <mt-header title="资料修改">
          <router-link to="/my" slot="left">
            <mt-button icon="back" >返回</mt-button>
          </router-link>
        </mt-header>
        <mt-field label="用户名" placeholder="请输入用户名"></mt-field>
        <mt-field label="邮箱" placeholder="请输入邮箱" type="email"></mt-field>
        <mt-field label="密码" placeholder="请输入密码" type="password"></mt-field>
        <mt-field label="手机号" placeholder="请输入手机号" type="tel"></mt-field>
        <mt-field label="网站" placeholder="请输入网址" type="url"></mt-field>
        <mt-field label="数字" placeholder="请输入数字" type="number"></mt-field>
        <mt-field label="生日" placeholder="请输入生日" type="date"></mt-field>
        <mt-field label="自我介绍" placeholder="自我介绍" type="textarea" rows="4"></mt-field>
    </div>
</template>
<script>

</script>
<!-- this.$router.go(-1); -->