import $ from 'jquery';

//------------------------------------------------------------------------------
// FORM CLASS:
//------------------------------------------------------------------------------
// Class constructor
function PGCustomValidationForm() {
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

PGCustomValidationForm.prototype.checkElementsLoaded = function() {
  if (!this.name || !this.postalCode || !this.email || !this.phoneNumber ||
      !this.nameError || !this.postalCodeError || !this.emailError || !this.phoneNumberError ||
      !this.submitBtn
    ) {
    return false;
  }
  return true;
}

PGCustomValidationForm.prototype.disableFormFields = function() {
  this.name.disabled = true;
  this.postalCode.disabled = true;
  this.email.disabled = true;
  this.phoneNumber.disabled = true;
  this.submitBtn.disabled = true;
}

PGCustomValidationForm.prototype.enableFormFields = function() {
  this.name.disabled = false;
  this.postalCode.disabled = false;
  this.email.disabled = false;
  this.phoneNumber.disabled = false;
  this.submitBtn.disabled = false;
}

PGCustomValidationForm.prototype.clearErrors = function() {
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

PGCustomValidationForm.prototype.gatherCustomerData = function() {
  this.customerData = {
    name: this.name.value.trim(),
    postalCode: this.postalCode.value.trim(),
    email: this.email.value.trim(),
    phoneNumber: this.phoneNumber.value.trim(),
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
      errorMsg: 'Postal code is required',
    });
  }
  if (!this.customerData.email || this.customerData.email.length === 0) {
    this.errors.push({
      elemName: 'email',
      errorMsg: 'Email is required',
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
}

PGCustomValidationForm.prototype.displayErrorOnUI = function(error) {
  var elemNameError = error.elemName + 'Error';
  var errorMsg = error.errorMsg;

  this[elemNameError].style.display = 'block';
  this[elemNameError].style.color = 'red';
  this[elemNameError].innerHTML = errorMsg;
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
  this.form.style.display = 'none';
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
