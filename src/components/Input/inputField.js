export const email_validation = {
    name: "email",
    label: "Email address",
    type: "email",
    id: "email",
    placeholder: "Enter email address",
    validation: {
        required: {
            value: true,
            message: "required",
        },
        pattern: {
            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: "not valid",
        },
    },
};

export const password_validation = {
    name: "password",
    label: "Password",
    type: "password",
    id: "password",
    placeholder: "Enter password ...",
    validation: {
        required: {
            value: true,
            message: "required",
        },
        minLength: {
            value: 6,
            message: "min 6 characters",
        },
    },
};
export const confirm_password_validation = {
    name: "cfPassword",
    label: "cfPassword",
    type: "password",
    id: "cfPassword",
    placeholder: "type cfPassword ...",
    validation: {
        required: {
            value: true,
            message: "required",
        },
        minLength: {
            value: 6,
            message: "min 6 characters",
        },
    },
};

export const fullName_validation = {
    name: 'fullName',
    label: 'Full name',
    type: 'text',
    id: 'fullName',
    placeholder: 'write your full name ...',
    validation: {
        required: {
            value: true,
            message: 'required',
        },
        maxLength: {
            value: 30,
            message: '30 characters max',
        },
    },
}