export type FieldValidatorType = (value: string) => string | undefined;

export const required: FieldValidatorType = (value) => {
    if (value) {
        return undefined;
    } else {
        return 'Field id required';
    }
}

export const maxLengthCreator = (maxLength: number):FieldValidatorType => (value) => {
    if (value && value.length > maxLength) {
        return `Max length is ${maxLength} symbols`;
    } else {
        return undefined;
    }
}