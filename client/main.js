import $ from 'jquery';

//------------------------------------------------------------------------------
// FORM CLASS:
//------------------------------------------------------------------------------
// Class constructor
function PGCustomValidationForm() {
  // Store reference of DOM form field elements
  this.form = $('#' + 'ninja_forms_form_32_all_fields_wrap');
  this.formError = $('#' + 'ninja_forms_field_238_error');
  this.name = $('#' + 'ninja_forms_field_234');
  this.nameError = $('#' + 'ninja_forms_field_234_error');
  this.postalCode = $('#' + 'ninja_forms_field_235');
  this.postalCodeError = $('#' + 'ninja_forms_field_235_error');
  this.email = $('#' + 'ninja_forms_field_236');
  this.emailError = $('#' + 'ninja_forms_field_236_error');
  this.phoneNumber = $('#' + 'ninja_forms_field_237');
  this.phoneNumberError = $('#' + 'ninja_forms_field_237_error');
  this.submitBtn = $('#' + 'ninja_forms_field_238');
  this.customerData = {};
  this.errors = [];
}

// Class methods
PGCustomValidationForm.prototype.handleSubmit = function() {
  var self = this;

  // Check that all element references are reachable
  if (!this.checkElementsLoaded.apply(this)) {
    console.log('At least one of the form elements couldn\'t be found. Check your elements id.');
    return;
  }

  // Log state
  console.log('all form element were loaded correctly!');

  // Attach 'click' event listener to submit button
  this.submitBtn.click(function (evt) {
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

PGCustomValidationForm.prototype.checkElementsLoaded = function() {
  if (!this.name[0] || !this.postalCode[0] || !this.email[0] || !this.phoneNumber[0] ||
      !this.nameError[0] || !this.postalCodeError[0] || !this.emailError[0] || !this.phoneNumberError[0] ||
      !this.submitBtn[0] || !this.form[0] || !this.formError[0]
    ) {
    return false;
  }
  return true;
}

PGCustomValidationForm.prototype.disableFormFields = function() {
  this.name.prop('disabled', true);
  this.postalCode.prop('disabled', true);
  this.email.prop('disabled', true);
  this.phoneNumber.prop('disabled', true);
  this.submitBtn.prop('disabled', true);
}

PGCustomValidationForm.prototype.enableFormFields = function() {
  this.name.prop('disabled', false);
  this.postalCode.prop('disabled', false);
  this.email.prop('disabled', false);
  this.phoneNumber.prop('disabled', false);
  this.submitBtn.prop('disabled', false);
}

PGCustomValidationForm.prototype.clearErrors = function() {
  this.errors = [];
  this.formError.html('');
  this.formError.hide();
  this.nameError.html('');
  this.nameError.hide();
  this.postalCodeError.html('');
  this.postalCodeError.hide();
  this.emailError.html('');
  this.emailError.hide();
  this.phoneNumberError.html('');
  this.phoneNumberError.hide();
}

PGCustomValidationForm.prototype.gatherCustomerData = function() {
  this.customerData = {
    name: this.name[0].value.trim(),
    postalCode: this.postalCode[0].value.trim(),
    email: this.email[0].value.trim(),
    phoneNumber: this.phoneNumber[0].value.trim(),
  };
}

PGCustomValidationForm.prototype.isValidEmailAddress = function(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
  return re.test(email);
}

PGCustomValidationForm.prototype.checkCustomerData = function() {
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
      errorMsg: 'Post code is required',
    });
  }
  if (this.customerData.postalCode.length > 100) {
    this.errors.push({
      elemName: 'postalCode',
      errorMsg: 'Post code is too long, 100 characters max',
    });
  }
  if (this.customerData.postalCode.length < 2) {
    this.errors.push({
      elemName: 'postalCode',
      errorMsg: 'Post code must be at least 2 characters long',
    });
  }
  if (!this.customerData.email || this.customerData.email.length === 0) {
    this.errors.push({
      elemName: 'email',
      errorMsg: 'Email is required',
    });
  }
  if (this.customerData.email.length > 100) {
    this.errors.push({
      elemName: 'email',
      errorMsg: 'Email is too long, 100 characters max',
    });
  }
  if (!this.isValidEmailAddress.apply(this, [this.customerData.email])) {
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
  if (this.customerData.phoneNumber.length > 100) {
    this.errors.push({
      elemName: 'phoneNumber',
      errorMsg: 'Phone number is too long, 100 characters max',
    });
  }
}

PGCustomValidationForm.prototype.displayErrorOnUI = function(error) {
  var elemNameError = error.elemName + 'Error';
  var errorMsg = error.errorMsg;

  this[elemNameError].show();
  this[elemNameError].css('color', 'red');
  this[elemNameError].html(errorMsg);
}

PGCustomValidationForm.prototype.performAJAXCall = function() {
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

PGCustomValidationForm.prototype.hideCustomerForm = function() {
  this.form.hide();
}

//------------------------------------------------------------------------------
// MAIN:
//------------------------------------------------------------------------------
$(document).ready(function() {
  // Log state
  console.log('document ready!');

  var form = new PGCustomValidationForm();

  form.handleSubmit();
});
