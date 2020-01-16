import React from 'react';
import { NavBar, Icon, List, InputItem, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import Remote from '../../util/Remote';
import './Login.css';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    register = () => {
        this.props.form.validateFields((error, value) => {
            console.log(error, value);
            if (error) {
                return;
            }
            Remote.post('/api/v1/admin/register', {
                ...value
            }, 'formData').then(({error, msg, data}) => {
                console.log(msg);
            }).catch(({ reason }) => {
                Toast.info(reason || '网络错误');
            })
        });
    }

    render() {
        const { getFieldProps } = this.props.form;

        return(
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => console.log('onLeftClick')}
                    rightContent={[
                        <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                        <Icon key="1" type="ellipsis" />
                    ]}
                >注册/登录
                </NavBar>
                <List>
                    {/* <InputItem
                        {...getFieldProps('bankCard', {
                            initialValue: '8888 8888 8888 8888',
                        })}
                        type="bankCard"
                    >银行卡</InputItem> */}
                    <InputItem
                        {...getFieldProps('nickname', {
                            rules: [
                                {required: true, message: '请输入手机号码'}
                            ]
                        })}
                        type="text"
                        placeholder="186 1234 1234"
                    >用户名</InputItem>
                    {/* <InputItem
                        {...getFieldProps('phone')}
                        type="phone"
                        placeholder="186 1234 1234"
                    >手机号码</InputItem> */}
                    <InputItem
                        {...getFieldProps('email')}
                        type="text"
                        placeholder=""
                    >电子邮箱</InputItem>
                    <InputItem
                        {...getFieldProps('password1')}
                        type="password"
                        placeholder="****"
                    >密码</InputItem>
                    <InputItem
                        {...getFieldProps('password2')}
                        type="password"
                        placeholder="****"
                    >确认密码</InputItem>
                    <List.Item>
                        <div
                            style={{ width: '100%', color: '#108ee9', textAlign: 'center' }}
                            onClick={() => this.register()}
                        >
                            注册
                        </div>
                    </List.Item>
                </List>
            </div>
        );
    }
}

export default createForm()(Login);