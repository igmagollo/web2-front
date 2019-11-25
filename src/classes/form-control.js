 export class FormControl {
    constructor(value = null, validations = []) {
        this.value = value;
        this.error = false;
        this.untouched = true;
        this.validations = validations;
        this.errorMessage = '';
    }

    update(value) {
        this.value = value;
        this.setTouched();
    }

    validate() {
        this.error = false;
        this.validations.every(
            (validation, index) => {
                if (validation.check(this.value)) return true;
                this.error = true;
                this.errorMessage = validation.message;
                return false;
            }
        );
    }

    showError() {
        return this.error && !this.untouched;
    }

    isValid() {
        return !this.untouched && !this.error;
    }

    setTouched() {
        this.untouched = false;
        this.validate();
    }

    setUntouched() {
        this.untouched = true;
    }

    clear() {
        this.value = null;
        this.setUntouched();
        this.error = false;
        this.errorMessage = '';
    }

    addValidation(check, message) {
        this.validations.push({
            check, message
        });
    }

}