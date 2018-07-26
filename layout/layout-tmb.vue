<template>
    <Layout>
        <Header>
            <slot name="header">
                <Menu mode="horizontal" theme="dark" :active-name="activeName" @on-select="menuSelect">
                    <div class="layout-logo">
                        <slot name="logo">
                            <img class="logo" :src="logo">
                        </slot>
                        <label v-text="appName" class="appName"></label>
                    </div>
                    <div class="user-dropdown-menu-con">
                        <Dropdown v-if="dropMenu !== undefined && dropMenu.length > 0" transfer trigger="click" @on-click="roleDropdown">
                            <a href="javascript:void(0)">
                                <span class="main-user-name"> {{currentRole.text}} </span>
                                <Icon type="arrow-down-b"></Icon>
                            </a>
                            <DropdownMenu slot="list">
                                <span class="dropdown-title">选择角色</span>
                                <DropdownItem :name="item.id" v-for="item in dropMenu" :key="item.id" >{{item.text}}</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown transfer trigger="click" @on-click="userDropdown">
                            <img :src="userImage" class="avatar">
                            <div slot="list" class="userDropdown-userInfo">
                                <div v-text="userName" class="username"></div>
                                <div class="delimiter" v-if="logoutUrl"></div>
                                <Button type="error" long @click="logOut" v-if="logoutUrl" size="small">退出</Button>
                            </div>
                        </Dropdown>
                    </div>
                    <div class="layout-nav">
                        <slot name="menu">
                            <template v-for="item in menu">
                                <menuItem :name="item.name" v-if="item.items === undefined" :key="item.name">
                                    <Icon :type="item.icon" v-if="item.icon !== undefined"></Icon>
                                    {{item.name}}
                                </menuItem>
                                <Submenu name="3" v-if="item.items !== undefined" :key="item.name">
                                    <template slot="title">
                                        <Icon :type="item.icon" v-if="item.icon !== undefined"></Icon>
                                        {{item.name}}
                                    </template>
                                    <MenuItem :name="subitem.name" v-for="subitem in item.items" :key="subitem.name">
                                        <Icon :type="subitem.icon" v-if="subitem.icon !== undefined"></Icon>
                                        {{subitem.name}}
                                    </MenuItem>
                                </Submenu>
                            </template>
                        </slot>
                    </div>
                </Menu>
            </slot>
        </Header>
        <Content :style="{padding: '0 50px'}">
            <slot name="nav">
                <Breadcrumb :style="{margin: '20px 0'}">
                    <Breadcrumb-item v-for="item in navPath" :key="item.name" :to="item.url">
                        <Icon :type="item.icon" v-if="item.icon !== undefined"></Icon>
                        {{item.name}}
                    </Breadcrumb-item>
                </Breadcrumb>
            </slot>
            <Card>
                <slot name="content"></slot>
            </Card>
        </Content>
        <Footer class="layout-footer-center">
            <slot name="footer">
                <span v-if="footer.type === 'text'" v-text="footer.data"></span>
                <div v-if="footer.type === 'html'" v-html="footer.data"></div>
            </slot>
        </Footer>
    </Layout>
</template>

<script>
export default {
    name: "layout-tmb",
    props: {
        appName: String,
        menu: {
            type: Array,
            default: function() {
                return [];
            }
        },
        footer: {
            type:Object,
            default: function() {
                return {}
            }
        },
        navPath: Array,
        dropMenu: Array,
        logo: String,
        logoutUrl: String,
        userImage: String,
        userName: String,
        userInfo: {
            type:Object,
            default: function() {
                return {};
            }
        },
        activeName:String
    },
    computed: {
        currentRole(){
            let role = this.dropMenu.find(item => item.active === "true");
            if (role === undefined) {
                role = {text: ""}
            }
            return role;
        }
    },
    methods:{
        roleDropdown(name) {
            this.$emit("role-change", name);
        },
        userDropdown (name) {
            let clickitem = this.dropMenu.find(item => item.name === name);
            if (clickitem !== undefined){ 
                if (clickitem.url !== undefined) {
                    window.location.href = clickitem.url;
                }
                if (clickitem.callback !== undefined) {
                    clickitem.callback();
                }
            }
        },
        menuSelect(name) {
            let clickitem = this.menu.find(item => item.name === name);
            if (clickitem !== undefined){ 
                if (clickitem.url !== undefined && clickitem.url !== "") {
                    window.location.href = clickitem.url;
                }
            }
        },
        logOut(){
            window.location.href = this.logoutUrl;
        }
    }
};
</script>

<style>
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-logo{
    float: left;
}
.layout-logo img.logo{
    height: 48px;
}
.layout-logo .appName {
    color: white;
    font-size: 24px;
    font-weight: 700;
    line-height: 60px;
}
.layout-nav{
    float: right;
    margin: 0 auto;
    margin-right: 20px;
}
.layout-footer-center{
    text-align: center;
    font-size: 12px;
}
.user-dropdown-menu-con{
    width: 180px;
    float: right;
    text-align: right;
}
.user-dropdown-menu-con .main-user-name{
    display: inline-block;
    width: 80px;
    font-size: 14px;
    word-break: keep-all;
    white-space: nowrap;
    vertical-align: middle;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: right;
}
.user-dropdown-menu-con .avatar{
    margin-left: 10px;
    text-align: right;
    max-width: 40px;
    max-height: 40px;
    border-radius: 4px;
}

.userDropdown-userInfo{
    width: 200px;
    padding: 8px;
}
.userDropdown-userInfo .username {
}
.delimiter{
    border-bottom: 1px solid #ddd;
    margin: 8px 0;
}
.dropdown-title {
    padding: 8px;
    line-height: 32px;
    font-size: 12px;
    color: #666;
}
</style>