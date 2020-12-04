import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input, Textarea} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import style from "./../common/FormsControls/FormsControls.module.css"
import {AppStateType} from "../../redux/redux-store";

type LoginFormOwnProps = {
    captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField<LoginFormValuesTypeKeys>("Email","email",[required],Input)}
            {createField<LoginFormValuesTypeKeys>("Password","password",[required],Input, {type: "password"})}
            {createField<LoginFormValuesTypeKeys>(null,"rememberMe",[],Input, {type: "checkbox"}, "remember me")}
            {/*<div>*/}
            {/*    <Field placeholder={"Email"} name={"email"} component={Input} validate={[required]}/>*/}
            {/*</div>*/}
            {/*<div>*/}
            {/*    <Field placeholder={"Password"} name={"password"} component={Input} validate={[required]} type={"password"}/>*/}
            {/*</div>*/}
            {/*<div>*/}
            {/*    <Field type="checkbox" name={"rememberMe"} component={Input}/> remember me*/}
            {/*</div>*/}
            
            {captchaUrl && <img src={captchaUrl}/>}
            {captchaUrl && createField("Symbols from image", "captcha", [required], Input  )}
            
            { error && <div className={style.formSummaryError}>
                {error}
            </div>
            }
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({form: 'login'})(LoginForm);

type MapStatePropsType = {
    captchaUrl: string | null,
    isAuth: boolean | null,
}

type MapDispatchPropsType = {
    login: (email:string, password:string, rememberMe:boolean, captcha:string) => void
}

export type LoginFormValuesType = {
    rememberMe: boolean;
    password: string;
    captcha: string;
    email: string;
}

type LoginFormValuesTypeKeys = Extract<keyof LoginFormValuesType, string>;

const Login: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
    const onSubmit = (formData: LoginFormValuesType) => {
        props.login(formData.email,formData.password, formData.rememberMe, formData.captcha);
    };
    
    if(props.isAuth) {
        return <Redirect to={"/profile"}/>
    }
    
    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
    </div>
}
const mapStateToProps = (state: AppStateType):MapStatePropsType => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, {login})(Login);