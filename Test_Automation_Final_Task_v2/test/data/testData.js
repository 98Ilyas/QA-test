export const loginData = {
    // Data for UC-1: Test login with empty credentials
    emptyCredentials: {
        username: '',
        password: ''
    },
    // Data for UC-2: Test login with only username
    usernameOnly: {
        username: 'error_user',
        password: ''
    },
    // Data for UC-3: Test login with valid credentials
    validUser: {
        username: 'standard_user',
        password: 'secret_sauce'
    },
    // Data for UC-3: Test login with multiple sets of credentials
    multipleUsers: [
        { username: 'standard_user', password: 'secret_sauce' },
        { username: 'performance_glitch_user', password: 'secret_sauce' },
        { username: 'problem_user', password: 'secret_sauce' },
    ]
};
// Data for error messages for UC-1 and UC-2 
export const errorMessages = {
    usernameRequired: 'Epic sadface: Username is required',
    passwordRequired: 'Epic sadface: Password is required'
};
// Data for page title for UC-3 
export const pageTitle = 'Swag Labs';