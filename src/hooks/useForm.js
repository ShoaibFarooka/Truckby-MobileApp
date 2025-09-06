import { useState } from "react";
import { getIn, setIn, addItem as addItemUtil, removeItem as removeItemUtil } from "../utils/formUtils";

function useForm(initialValues = {}, schema = null) {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});

    const onChange = (name, value) => {
        setValues((prev) => setIn(prev, name, value));
        setErrors((prev) => setIn(prev, name, undefined));
    };

    const setFieldError = (field, message) => {
        setErrors((prev) => setIn(prev, field, message));
    };

    const resetForm = () => {
        setValues(initialValues);
        setErrors({});
    };

    const validate = async () => {
        if (!schema) return true;
        try {
            await schema.validate(values, { abortEarly: false });
            setErrors({});
            return true;
        } catch (validationError) {
            let fieldErrors = {};
            validationError.inner.forEach((err) => {
                fieldErrors = setIn(fieldErrors, err.path, err.message);
            });
            setErrors(fieldErrors);
            return false;
        }
    };

    const onSubmit = async (handleSubmit) => {
        // const isValid = await validate();
        // if (!isValid) return;
        await handleSubmit(values);
    };

    const addItem = (field, item) => setValues((prev) => addItemUtil(prev, field, item));
    const removeItem = (field, index) => {
        setValues((prev) => removeItemUtil(prev, field, index));
        setErrors((prev) => removeItemUtil(prev, field, index));
    };

    return {
        values,
        errors,
        onChange,
        setFieldError,
        resetForm,
        onSubmit,
        setValues,
        setErrors,
        validate,
        addItem,
        removeItem,
    };
}

export default useForm;