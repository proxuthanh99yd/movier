import PropTypes from "prop-types";
import { useFormContext } from "react-hook-form";

function Input({ name, label, type, id, placeholder, validation, className }) {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    const isFormInvalid = (err) => {
        if (Object.keys(err).length > 0) return true;
        return false;
    };

    function findInputError(errors, name) {
        const filtered = Object.keys(errors)
            .filter((key) => key.includes(name))
            .reduce((cur, key) => {
                return Object.assign(cur, { error: errors[key] });
            }, {});
        return filtered;
    }

    const inputErrors = findInputError(errors, name);
    const isInvalid = isFormInvalid(inputErrors);
    return (
        <div className={`form-group ${className}`}>
            <label htmlFor={id} className="form-label">
                {label}
            </label>
            <input
                type={type}
                className={`form-control ${isInvalid && "invalid"}`}
                id={id}
                name={name}
                placeholder={placeholder}
                {...register(name, validation)}
            />
            <div className="icon">
                <img src={`images/${name}-icon.svg`} alt="icon" />
            </div>
            {isInvalid && (
                <span className="error-msg">{inputErrors.error.message}</span>
            )}
        </div>
    );
}

Input.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.string,
    id: PropTypes.string,
    placeholder: PropTypes.string,
    validation: PropTypes.object,
    multiline: PropTypes.string,
    className: PropTypes.string,
};

export default Input;
