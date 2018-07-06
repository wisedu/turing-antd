<template>
    <Layout>
        <Header>
            <slot name="menu">
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo">
                        <slot name="logo"></slot>
                    </div>
                    <div class="layout-nav">
                        <menuItem name="1">
                            <Icon type="ios-navigate"></Icon>
                            Item 1
                        </menuItem>
                        <menuItem name="2">
                            <Icon type="ios-keypad"></Icon>
                            Item 2
                        </menuItem>
                        <menuItem name="3">
                            <Icon type="ios-analytics"></Icon>
                            Item 3
                        </menuItem>
                        <menuItem name="4">
                            <Icon type="ios-paper"></Icon>
                            Item 4
                        </menuItem>
                    </div>
                </Menu>
            </slot>
        </Header>
        <Content :style="{padding: '0 50px'}">
            <slot name="nav">
                <Breadcrumb :style="{margin: '20px 0'}">
                    <Breadcrumb-item>Home</Breadcrumb-item>
                    <Breadcrumb-item>Components</Breadcrumb-item>
                    <Breadcrumb-item>Layout</Breadcrumb-item>
                </Breadcrumb>
            </slot>
            <Card>
                <slot name="content"></slot>
            </Card>
        </Content>
        <Footer class="layout-footer-center">
            <slot name="footer"></slot>
        </Footer>
    </Layout>
</template>

<script>
export default {
    name: "layout-tmb",
    props: {
        menu: Object,
        navPath: Object
    }
};
</script>

<style scoped>
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}
.layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}
.layout-footer-center{
    text-align: center;
}
</style>