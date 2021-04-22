const General = {
    returnAMethod: (method) => ({...args}) => {
        method(args);
    },
    errorsExist: ({req, validationResult}) => {
        const validations = validationResult(req);
        const formHasErrors = validations.errors.length > 0;
        return formHasErrors;
    },
    showErrors: ({req, validationResult}) => (variables = null) => {
        const validations = validationResult(req); 
        return {
            errors: validations.mapped(),
            oldData: req.body,
            ...variables
        }
    },
    // eslint-disable-next-line arrow-body-style
    existsInDB: ({model, condition}) => {
        return model.findOne({
            where: condition
        });
    },
    setImages: (element, image) => {
        element.setImages(image);
    }
}

module.exports = General;
