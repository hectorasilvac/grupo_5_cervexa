/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
function ConfirmationOfDeletion() {
    const button = document.getElementById('delete-product');
    button.addEventListener('click', event => {
        const confirmation = confirm('¿Estas segur@ que quieres eliminar este producto?');
        return (!confirmation) ? event.preventDefault() : null;
    });
}

window.addEventListener('load', () => {
    ConfirmationOfDeletion();
});
