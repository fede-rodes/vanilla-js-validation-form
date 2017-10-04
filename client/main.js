import $ from 'jquery';

//------------------------------------------------------------------------------
// AUX FUNCTIONS:
//------------------------------------------------------------------------------
function isValidEmailAddress(emailAddress) {
  var pattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);
  return pattern.test(emailAddress);
};

//------------------------------------------------------------------------------
// FORM CLASS:
//------------------------------------------------------------------------------
// Class constructor
function Form() {
  // Store reference of DOM form field elements
  this.form = document.getElementById('ninja_forms_form_32_all_fields_wrap');
  this.formError = document.getElementById('ninja_forms_field_238_error');
  this.name = document.getElementById('ninja_forms_field_234');
  this.nameError = document.getElementById('ninja_forms_field_234_error');
  this.postalCode = document.getElementById('ninja_forms_field_235');
  this.postalCodeError = document.getElementById('ninja_forms_field_235_error');
  this.email = document.getElementById('ninja_forms_field_236');
  this.emailError = document.getElementById('ninja_forms_field_236_error');
  this.phoneNumber = document.getElementById('ninja_forms_field_237');
  this.phoneNumberError = document.getElementById('ninja_forms_field_237_error');
  this.submitBtn = document.getElementById('ninja_forms_field_238');
  this.customerData = {};
  this.errors = [];
}

// Class methods
Form.prototype.handleSubmit = function() {
  var self = this;

  // Check that all element references are reachable
  if (!this.checkElementsLoaded.apply(this)) {
    console.log('At least one of the form elements couldn\'t be found. Check your elements id.');
    return;
  }

  // Log state
  console.log('all form element were loaded correctly!');

  // Attach 'click' event listener to submit button
  this.submitBtn.addEventListener('click', function (evt) {
    // Prevent the page to reaload
    evt.preventDefault();

    // Log event
    console.log('submit button clicked!');

    self.disableFormFields.apply(self);

    self.clearErrors.apply(self);

    self.gatherCustomerData.apply(self);

    // Log gathered data
    console.log(self.customerData);

    self.checkCustomerData.apply(self);

    // Return handler in case of error
    if (self.errors.length > 0) {
      // Display first error on UI
      var firstError = self.errors[0];
      self.displayErrorOnUI.apply(self, [firstError]);

      self.enableFormFields.apply(self);
      return;
    }

    // TODO: at this point we should fire the AJAX call and wait for the
    // response to get back in order to inject the returned installer into
    // the UI
    self.performAJAXCall.apply(self);
  });
}

Form.prototype.checkElementsLoaded = function() {
  if (!this.name || !this.postalCode || !this.email || !this.phoneNumber ||
      !this.nameError || !this.postalCodeError || !this.emailError || !this.phoneNumberError ||
      !this.submitBtn
    ) {
    return false;
  }
  return true;
}

Form.prototype.disableFormFields = function() {
  this.name.disabled = true;
  this.postalCode.disabled = true;
  this.email.disabled = true;
  this.phoneNumber.disabled = true;
  this.submitBtn.disabled = true;
}

Form.prototype.enableFormFields = function() {
  this.name.disabled = false;
  this.postalCode.disabled = false;
  this.email.disabled = false;
  this.phoneNumber.disabled = false;
  this.submitBtn.disabled = false;
}

Form.prototype.clearErrors = function() {
  this.errors = [];
  this.formError.innerHTML = '';
  this.formError.style.display = 'none';
  this.nameError.innerHTML = '';
  this.nameError.style.display = 'none';
  this.postalCodeError.innerHTML = '';
  this.postalCodeError.style.display = 'none';
  this.emailError.innerHTML = '';
  this.emailError.style.display = 'none';
  this.phoneNumberError.innerHTML = '';
  this.phoneNumberError.style.display = 'none';
}

Form.prototype.gatherCustomerData = function() {
  this.customerData = {
    name: this.name.value.trim(),
    postalCode: this.postalCode.value.trim(),
    email: this.email.value.trim(),
    phoneNumber: this.phoneNumber.value.trim(),
  };
}

Form.prototype.checkCustomerData = function() {
  if (!this.customerData.name || this.customerData.name.length === 0) {
    this.errors.push({
      elemName: 'name',
      errorMsg: 'Name is required',
    });
  }
  if (this.customerData.name.length > 100) {
    this.errors.push({
      elemName: 'name',
      errorMsg: 'Name is too long, 100 characters max',
    });
  }
  if (!this.customerData.postalCode || this.customerData.postalCode.length === 0) {
    this.errors.push({
      elemName: 'postalCode',
      errorMsg: 'Postal code is required',
    });
  }
  if (!this.customerData.email || this.customerData.email.length === 0) {
    this.errors.push({
      elemName: 'email',
      errorMsg: 'Email is required',
    });
  }
  if (!isValidEmailAddress(this.customerData.email)) {
    this.errors.push({
      elemName: 'email',
      errorMsg: 'Please, provide a valid email address',
    });
  }
  if (!this.customerData.phoneNumber || this.customerData.phoneNumber.length === 0) {
    this.errors.push({
      elemName: 'phoneNumber',
      errorMsg: 'Phone number is required',
    });
  }
}

Form.prototype.displayErrorOnUI = function(error) {
  var elemNameError = error.elemName + 'Error';
  var errorMsg = error.errorMsg;

  this[elemNameError].style.display = 'block';
  this[elemNameError].style.color = 'red';
  this[elemNameError].innerHTML = errorMsg;
}

Form.prototype.performAJAXCall = function() {
  // HAVEN'T USED AJAX IN A WHILE, THE FOLLOWING EXAMPLE COULD BE WRONG!
  var self = this;

  console.log('Fire AJAX call :)');
  /* $.post('url', this.customerData, function(err, res) {
    if (err) {
      // Log message on console
      console.log(err);

      // Display general error on UI
      var error = {
        elemName: 'submiBtn',
        errorMsg: 'Something went wrong :(',
      };
      self.displayErrorOnUI.apply(self, [error]);

      // Re-enable form fields and submit button
      self.enableFormFields.apply(self);
    } else {
      // Hide form
      self.hideCustomerForm.apply(self);
      // TODO: use the data contained in 'res' to display installer on UI
    }
  }); */
}

Form.prototype.hideCustomerForm = function() {
  this.form.style.display = 'none';
}

//------------------------------------------------------------------------------
// MAIN:
//------------------------------------------------------------------------------
$(document).ready(function() {
  // Log state
  console.log('document ready!');

  var form = new Form();

  form.handleSubmit();
});

/*
import $ from 'jquery';

//------------------------------------------------------------------------------
// AUX FUNCTIONS:
//------------------------------------------------------------------------------
function isValidEmailAddress(emailAddress) {
  var pattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);
  return pattern.test(emailAddress);
};

//------------------------------------------------------------------------------
// FORM CLASS:
//------------------------------------------------------------------------------
// Define form class
var form = {
  init: function () {
    var self = this;

    // Store reference of DOM form field elements
    this.form = document.getElementById('ninja_forms_form_32_all_fields_wrap');
    this.formError = document.getElementById('ninja_forms_field_238_error');
    this.name = document.getElementById('ninja_forms_field_234');
    this.nameError = document.getElementById('ninja_forms_field_234_error');
    this.postalCode = document.getElementById('ninja_forms_field_235');
    this.postalCodeError = document.getElementById('ninja_forms_field_235_error');
    this.email = document.getElementById('ninja_forms_field_236');
    this.emailError = document.getElementById('ninja_forms_field_236_error');
    this.phoneNumber = document.getElementById('ninja_forms_field_237');
    this.phoneNumberError = document.getElementById('ninja_forms_field_237_error');
    this.submitBtn = document.getElementById('ninja_forms_field_238');
    this.customerData = {};
    this.errors = [];

    // Check that all element references are reachable
    if (!this.checkElementsLoaded.apply(this)) {
      console.log('At least one of the form elements couldn\'t be found. Check your elements id.');
      return;
    }

    // Log state
    console.log('all form element were loaded correctly!');

    // Attach 'click' event listener to submit button
    this.submitBtn.addEventListener('click', function (evt) {
      // Prevent the page to reaload
      evt.preventDefault();

      // Log event
      console.log('submit button clicked!');

      self.disableFormFields.apply(self);

      self.clearErrors.apply(self);

      self.gatherCustomerData.apply(self);

      // Log gathered data
      console.log(self.customerData);

      self.checkCustomerData.apply(self);

      // Return handler in case of error
      if (self.errors.length > 0) {
        // Display first error on UI
        var firstError = self.errors[0];
        self.displayErrorOnUI.apply(self, [firstError]);

        self.enableFormFields.apply(self);
        return;
      }

      // TODO: at this point we should fire the AJAX call and wait for the
      // response to get back in order to inject the returned installer into
      // the UI
      self.performAJAXCall.apply(self);
    });
  },

  checkElementsLoaded: function () {
    if (!this.name || !this.postalCode || !this.email || !this.phoneNumber ||
        !this.nameError || !this.postalCodeError || !this.emailError || !this.phoneNumberError ||
        !this.submitBtn
      ) {
      return false;
    }
    return true;
  },

  disableFormFields: function () {
    this.name.disabled = true;
    this.postalCode.disabled = true;
    this.email.disabled = true;
    this.phoneNumber.disabled = true;
    this.submitBtn.disabled = true;
  },

  enableFormFields: function () {
    this.name.disabled = false;
    this.postalCode.disabled = false;
    this.email.disabled = false;
    this.phoneNumber.disabled = false;
    this.submitBtn.disabled = false;
  },

  clearErrors: function () {
    this.errors = [];
    this.formError.innerHTML = '';
    this.formError.style.display = 'none';
    this.nameError.innerHTML = '';
    this.nameError.style.display = 'none';
    this.postalCodeError.innerHTML = '';
    this.postalCodeError.style.display = 'none';
    this.emailError.innerHTML = '';
    this.emailError.style.display = 'none';
    this.phoneNumberError.innerHTML = '';
    this.phoneNumberError.style.display = 'none';
  },

  gatherCustomerData: function () {
    this.customerData = {
      name: this.name.value.trim(),
      postalCode: this.postalCode.value.trim(),
      email: this.email.value.trim(),
      phoneNumber: this.phoneNumber.value.trim(),
    };
  },

  checkCustomerData: function () {
    if (!this.customerData.name || this.customerData.name.length === 0) {
      this.errors.push({
        elemName: 'name',
        errorMsg: 'Name is required',
      });
    }
    if (this.customerData.name.length > 100) {
      this.errors.push({
        elemName: 'name',
        errorMsg: 'Name is too long, 100 characters max',
      });
    }
    if (!this.customerData.postalCode || this.customerData.postalCode.length === 0) {
      this.errors.push({
        elemName: 'postalCode',
        errorMsg: 'Postal code is required',
      });
    }
    if (!this.customerData.email || this.customerData.email.length === 0) {
      this.errors.push({
        elemName: 'email',
        errorMsg: 'Email is required',
      });
    }
    if (!isValidEmailAddress(this.customerData.email)) {
      this.errors.push({
        elemName: 'email',
        errorMsg: 'Please, provide a valid email address',
      });
    }
    if (!this.customerData.phoneNumber || this.customerData.phoneNumber.length === 0) {
      this.errors.push({
        elemName: 'phoneNumber',
        errorMsg: 'Phone number is required',
      });
    }
  },

  displayErrorOnUI: function (error) {
    console.log('error', error);
    var elemNameError = error.elemName + 'Error';
    var errorMsg = error.errorMsg;

    console.log('this[elemNameError]', this[elemNameError]);

    this[elemNameError].style.display = 'block';
    this[elemNameError].style.color = 'red';
    this[elemNameError].innerHTML = errorMsg;
  },

  performAJAXCall: function () {
    // HAVEN'T USED AJAX IN A WHILE, THE FOLLOWING EXAMPLE COULD BE WRONG!
    var self = this;

    console.log('Fire AJAX call :)');
    /* $.post('url', this.customerData, function(err, res) {
      if (err) {
        // Log message on console
        console.log(err);

        // Display general error on UI
        var error = {
          elemName: 'submiBtn',
          errorMsg: 'Something went wrong :(',
        };
        self.displayErrorOnUI.apply(self, [error]);

        // Re-enable form fields and submit button
        self.enableFormFields.apply(self);
      } else {
        // Hide form
        self.hideCustomerForm.apply(self);
        // TODO: use the data contained in 'res' to display installer on UI
      }
    }); ///
  },

  hideCustomerForm: function () {
    this.form.style.display = 'none';
  },
};

//------------------------------------------------------------------------------
// MAIN:
//------------------------------------------------------------------------------
$(document).ready(function() {
  // Log state
  console.log('document ready!');

  form.init();
});
*/

/*
//------------------------------------------------------------------------------
// MAIN:
//------------------------------------------------------------------------------
$(document).ready(function() {
  // Log state
  console.log('document ready!');

  // Point to form field elements
  var form = document.getElementById('ninja_forms_form_32_all_fields_wrap');
  var formError = document.getElementById('ninja_forms_field_238_error');
  var name = document.getElementById('ninja_forms_field_234');
  var nameError = document.getElementById('ninja_forms_field_234_error');
  var postalCode = document.getElementById('ninja_forms_field_235');
  var postalCodeError = document.getElementById('ninja_forms_field_235_error');
  var email = document.getElementById('ninja_forms_field_236');
  var emailError = document.getElementById('ninja_forms_field_236_error');
  var phoneNumber = document.getElementById('ninja_forms_field_237');
  var phoneNumberError = document.getElementById('ninja_forms_field_237_error');
  var submitBtn = document.getElementById('ninja_forms_field_238');

  if (!name || !postalCode || !email || !phoneNumber ||
      !nameError || !postalCodeError || !emailError || !phoneNumberError ||
      !submitBtn
    ) {
    console.log('At least one of the form elements couldn\'t be found. Check your elements id.');
    return;
  }

  // Log state
  console.log('all form fields loaded correctly!');

  submitBtn.addEventListener('click', function (evt) {
    // Prevent the page to reaload
    evt.preventDefault();

    // Log event
    console.log('submit button clicked!');

    // Disabled form fields
    name.disabled = true;
    postalCode.disabled = true;
    email.disabled = true;
    phoneNumber.disabled = true;
    submitBtn.disabled = true;

    // Clear errors if any
    formError.innerHTML = '';
    formError.style.display = 'none';
    nameError.innerHTML = '';
    nameError.style.display = 'none';
    postalCodeError.innerHTML = '';
    postalCodeError.style.display = 'none';
    emailError.innerHTML = '';
    emailError.style.display = 'none';
    phoneNumberError.innerHTML = '';
    phoneNumberError.style.display = 'none';

    // Gather fields data
    var customerData = {
      name: name.value.trim(),
      postalCode: postalCode.value.trim(),
      email: email.value.trim(),
      phoneNumber: phoneNumber.value.trim(),
    }

    // Log gathered data
    console.log(customerData);

    // Checks
    var errors = [];
    if (!customerData.name || customerData.name.length === 0) {
      errors.push({
        fieldName: name,
        errorMsg: 'Name is required',
      });
    }
    if (customerData.name.length > 100) {
      errors.push({
        fieldName: name,
        errorMsg: 'Name is too long, 100 characters max',
      });
    }
    if (!customerData.postalCode || customerData.postalCode.length === 0) {
      errors.push({
        fieldName: postalCode,
        errorMsg: 'Postal code is required',
      });
    }
    if (!customerData.email || customerData.email.length === 0) {
      errors.push({
        fieldName: email,
        errorMsg: 'Email is required',
      });
    }
    if (!isValidEmailAddress(customerData.email)) {
      errors.push({
        fieldName: email,
        errorMsg: 'Please, provide a valid email address',
      });
    }
    if (!customerData.phoneNumber || customerData.phoneNumber.length === 0) {
      errors.push({
        fieldName: phoneNumber,
        errorMsg: 'Phone number is required',
      });
    }

    // Handle error
    if (errors.length > 0) {
      // Display first error on UI
      var firstError = errors[0];
      var fieldName = firstError.fieldName;
      var errorMsg = firstError.errorMsg;

      fieldName.style.display = 'block';
      fieldName.style.color = 'red';
      fieldName.innerHTML = errorMsg;

      // Re-enable form fields and submit button
      name.disabled = false
      postalCode.disabled = false;
      email.disabled = false;
      phoneNumber.disabled = false;
      submitBtn.disabled = false;
      return;
    }

    // TODO: at this point we should do fire the AJAX call and wait for the
    // response to inject the returned installer into the UI
    // HAVEN'T USED AJAX IN A WHILE, THE FOLLOWING EXAMPLE COULD BE WRONG!
    console.log('Fire AJAX call :)');
    /* $.post("url", customerData, function(err, res) {
      if (err) {
        // Log message on console
        console.log(err);

        // Display general error on UI
        emailError.style.display = 'block';
        emailError.style.color = 'red';
        emailError.innerHTML = 'Something went wrong :(';

        // Re-enable form fields and submit button
        name.disabled = false
        postalCode.disabled = false;
        email.disabled = false;
        phoneNumber.disabled = false;
        submitBtn.disabled = false;
      } else {
        form.style.display = 'none';

        // TODO: use the data contained in 'res' to display installer on UI
      }
    }); ////
  });
});
*/

/*
    // Checks
    var errors = [];
    if (!customerData.name || customerData.name.length === 0) {
      errors.push({
        fieldName: 'name',
        errorMsg: 'Name is required',
      });
      // Log message on console
      console.log(errorMsg);

      // Display message in form
      nameError.style.display = 'block';
      nameError.style.color = 'red';
      nameError.innerHTML = errorMsg;
      return;
    }
    if (customerData.name.length > 100) {
      var errorMsg = 'Name is too long, 100 characters max';

      // Log message on console
      console.log(errorMsg);

      // Display message in form
      nameError.style.display = 'block';
      nameError.style.color = 'red';
      nameError.innerHTML = errorMsg;
      return;
    }
    if (!customerData.postalCode || customerData.postalCode.length === 0) {
      var errorMsg = 'Postal code is required';

      // Log message on console
      console.log(errorMsg);

      // Display message in form
      postalCodeError.style.display = 'block';
      postalCodeError.style.color = 'red';
      postalCodeError.innerHTML = errorMsg;
      return;
    }
    if (!customerData.email || customerData.email.length === 0) {
      var errorMsg = 'Email is required';

      // Log message on console
      console.log(errorMsg);

      // Display message in form
      emailError.style.display = 'block';
      emailError.style.color = 'red';
      emailError.innerHTML = errorMsg;
      return;
    }
    if (!isValidEmailAddress(customerData.email)) {
      var errorMsg = 'Please, provide a valid email address';

      // Log message on console
      console.log(errorMsg);

      // Display message in form
      emailError.style.display = 'block';
      emailError.style.color = 'red';
      emailError.innerHTML = errorMsg;
      return;
    }
    if (!customerData.phoneNumber || customerData.phoneNumber.length === 0) {
      var errorMsg = 'Phone number is required';

      // Log message on console
      console.log(errorMsg);

      // Display message in form
      phoneNumberError.style.display = 'block';
      phoneNumberError.style.color = 'red';
      phoneNumberError.innerHTML = errorMsg;
      return;
    }
*/
