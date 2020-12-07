import React, {ComponentType} from "react";
import styles from "./FormsControls.module.css";
import {Field, WrappedFieldMetaProps, WrappedFieldProps} from "redux-form";
import {FieldValidatorType} from "../../../utils/validators/validators";

type FormControlPropsType = {
    meta: WrappedFieldMetaProps
}

const FormControl: React.FC<FormControlPropsType> = ({meta: {error, touched}, children}) => {
    const hasError = error && touched;
    return (
        <div className={styles.formControl + ' ' + (hasError ? styles.error : "")}>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    );
}

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}><textarea {...input} {...restProps}/></FormControl>
}

export const Input: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}><input {...input} {...restProps}/></FormControl>
}

export function createField<T extends string>(placeholder: string | null, 
                            name: T, 
                            validators: Array<FieldValidatorType>, 
                            component: React.FC<WrappedFieldProps>, 
                            props = {}, 
                            text = ""){
return (
    <div>
        <Field placeholder={placeholder} name={name}
               validate={validators}
               component={component}
               {...props}
        /> {text}
    </div>
)
}