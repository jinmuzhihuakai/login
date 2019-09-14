import React,{Component} from 'react';
import {Form,Input,Icon,Button,message} from "antd";

import logo from './logo.png';
import './index.less';
import axios from 'axios';
@Form.create()
class Login extends Component{
    /*自定义表单校验的方法
    @param rule 包含
    @param value 表单项的值
    @param callback传参时，说明检验失败，并提示传入参数，当callback没有参数，说明校验成功
    * */
validator=(rule,value,callback)=>{
    //打印出来rule里面有filed,输出数据类型（username和password）
const name=rule.field==='username'? '用户名':'密码';
    console.log(rule,value);
    if (!value){
        return callback(`请输入${name}`);
    }
    if (value.length<3){
        return callback(`${name}长度必须大于3位`);
    } 
    if (value.length>13) {
        return callback(`${name}长度必必须小于13位`);
    }
    const reg=/^[a-zA-Z0-9_]{3,13}$/;
    if (!reg.test(value)){
        return callback(`${name}只能包含数字,英文和下划线`)
    }
    //callback必须调用
    callback();
};
login=(e)=>{
    e.preventDefault();
    this.props.form.validateFields((error,values)=>{
        /*error 校验失败错误
        校验失败就是{}
        校验通过就是null
        values 所有表单项的值
        * */
        if (!error){
            //校验通过
            console.log(values);//username
            //获取表单项的值
            const {username,password}=values;
            //发送请求，请求登录
            /*发送请求，遇见了跨域问题（当前服务器是3000，要访问的是5000）
            * 解决：
            * 1.json
            * 2.cors修改服务器代码
            * 3.proxy 服务器代理模式（正向代理）
            * 正向代理
            * 反向代理（nginx）
            * "proxy"：“http://localhost:5000”开启代理服务器
            * localhost:5000--->就是目标服务器地址
            * 工作原理：
            * 1：浏览器发送请求给代理服务器（这时候因为端口号一致，所以没有跨域问题）
            * 2: 代理服务器将请求转发给服务器（ 因为是服务器与服务器直接通信，没有跨域问题）
            * 3： 目标服务器返回响应给代理服务器
            * 4：代理服务器返回响应给浏览器
            *缺点：只能用于开发环境，不能用于上线环境
            *
            * */
             axios.post('http://locahost:3000/api/login',{username,password})
                 .then((response)=>{
            //请求成功
                     //判断status的值，来决定是否登录成功
                     if (response.data.status===0){
                         //登录成功
                         message.success('登陆成功')
                         //跳转到/路由
                        //return <Redirect to="/">
                         this.props.history.replace('./')//连接的routes.js,所以有路由属性replace替换成别的路由，不能回去，push还能倒退
                     }else {
                        message.error(response.data.msg);
                     };
                 })
                 .catch((error)=>{
                     //请求失败 登录失败
                     message.error( '未知错误，请联系管理员')
                 })
        }
    })
};
    render() {
        const { getFieldDecorator } = this.props.form;
        return <div className="login">
            <header className="login-header">
                <img src={logo} alt="logo"/>
                <h1>React项目：后台管理系统</h1>
            </header>
            <section className="login-section">
                <h3>用户登录</h3>
                <Form onSubmit={this.login}>
                    <Form.Item>
                        {
                            getFieldDecorator(
                                'username',
                                {
                                    rules:[
                                        {
                                            validator:this.validator,//适用于难得校验
                                        }
                                        //zhi适用于简单验证                                     // {required:true,message:'请输入用户名'},
                                        // {min:3,message:'用户名长度必须大于3位'},
                                        // {max:13,message:'用户名长度必须小于13位'},
                                        // {pattern:/^[a-zA-Z0-9_]{3,13}$/,message:'用户名只能包含数字,英文和下划线'}
                                    ]
                                }
                            )( <Input prefix={<Icon type="user" />}  placeholder="用户名"/>)
                        }
                    </Form.Item>
                <Form.Item>
                    {
                        getFieldDecorator(
                            'password',{
                                rules: [
                                    {
                                        validator:this.validator,//不用函数为了当重新渲染时不会再重新生成函数
                                    }
                                ]
                            }
                        )( <Input prefix={<Icon type="lock" />}  placeholder="用户密码" type="password"/>)
                    }
                </Form.Item>

                    <Form.Item>
                       <Button type="primary" className="login-btn" htmlType="submit">登录</Button>
                    </Form.Item>
                </Form>

            </section>
        </div>
    }
}
//Form.creat给Logo组件传递form属性
// const newLogin=Form.create()(Login);
// export default newLogin;
export default Login