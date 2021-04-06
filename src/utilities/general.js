const General = {
    verifyErrors: (req, validationResult) => {
        const validations = validationResult(req);
        const formHasErrors = validations.errors.length > 0;

        if (formHasErrors) {
            return validations;
        }

        return false;
    },
    renderErrors: (req, res, validations) => (controller) => (variables = null) => {
        controller.create(req, res, {
            errors: validations.mapped(),
            oldData: req.body,
            ...variables
        });
    },
}

module.exports = General;
