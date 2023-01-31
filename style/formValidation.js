const nameEl = document.querySelector('#txt-name');
const numberEl = document.querySelector('#txt-number');
const monthEl = document.querySelector('#txt-month');
const yearEl = document.querySelector('#txt-year');
const cvcEl = document.querySelector('#txt-cvc');

const form = document.querySelector('#credit-card');

const checkCardname = () => {

    let valid = false;

    const min = 3,
        max = 25;

    const cardname = nameEl.value.trim();

    if (!isRequired(cardname)) {
        showError(nameEl, 'Cardholder Name cannot be blank.');
    } else if (!isBetween(cardname.length, min, max)) {
        showError(nameEl, `Cardholder Name must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(nameEl);
        valid = true;
    }
    return valid;
};


const checkCardnumber = () => {
    let valid = false;
    const min = 16;
    const cardnumber = numberEl.value.trim();
    if (!isRequired(cardnumber)) {
        showError(numberEl, 'Card Number cannot be blank.');
    } else if (!isBetween(cardnumber.length, min)) {
        showError(numberEl, `Card Number must be ${min} characters.`)
    } else if (!isNumberValid(cardnumber)) {
        showError(numberEl, 'Wrong format, numbers only.')
    } else {
        showSuccess(numberEl);
        valid = true;
    }
    return valid;
};

const checkMonth = () => {
    let valid = false;
    const month = monthEl.value.trim();
    if (!isRequired(month)) {
        showError(monthEl, 'Can`t be blank');
    } else {
        showSuccess(monthEl);
        valid = true;
    }
    return valid;
};

const checkYear = () => {
    let valid = false;
    const year = yearEl.value.trim();
    if (!isRequired(year)) {
        showError(yearEl, 'Can`t be blank');
    } else {
        showSuccess(yearEl);
        valid = true;
    }
    return valid;
};

const checkCvc = () => {
    let valid = false;
    const min = 3;
    const cvc = cvcEl.value.trim();
    if (!isRequired(cvc)) {
        showError(cvcEl, 'Can`t be blank');
    } else if (!isBetween(cvc.length, min)) {
        showError(cvcEl, `CVC min. ${min} numbers.`)
    } else {
        showSuccess(cvcEl);
        valid = true;
    }
    return valid;
};

const isNumberValid = (cardnumber) => {
    const re = /^[0-9]+$/;
    return re.test(cardnumber);
};

const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;


const showError = (input, message) => {
    // get the form-field element
    const formField = input.parentElement;
    // add the error class
    formField.classList.remove('success');
    formField.classList.add('error');

    // show the error message
    const error = formField.querySelector('small');
    error.textContent = message;
};

const showSuccess = (input) => {
    // get the form-field element
    const formField = input.parentElement;

    // remove the error class
    formField.classList.remove('error');
    formField.classList.add('success');

    // hide the error message
    const error = formField.querySelector('small');
    error.textContent = '';
}


form.addEventListener('submit', function (e) {
    // prevent the form from submitting
    e.preventDefault();

    // validate fields
    let isCardnameValid = checkCardname(),
        isCardnumberValid = checkCardnumber(),
        isMonthValid = checkMonth(),
        isYearValid = checkYear(),
        isCvcValid = checkCvc();

    let isFormValid = isCardnameValid &&
        isCardnumberValid &&
        isMonthValid &&
        isYearValid &&
        isCvcValid;

    // submit to the server if the form is valid
    if (isFormValid) {

    }
});


const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        // cancel the previous timer
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // setup a new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

form.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'txt-name':
            checkCardname();
            break;
        case 'txt-number':
            checkCardnumber();
            break;
        case 'txt-month':
            checkMonth();
            break;
        case 'txt-year':
            checkYear();
            break;
        case 'txt-cvc':
            checkCvc();
            break;
    }
}));