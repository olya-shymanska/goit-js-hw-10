import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
    event.preventDefault();
const delay = Number(document.querySelector('input').value);

const input = document.querySelector('input[name="state"]:checked').value;

    makePromise(delay, input);
});

const makePromise = (delay, input) => {
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        if (input === 'fulfilled') {
            resolve(delay);
        } else {
            reject(delay);
        }
    }, delay);
})
    promise
    .then((resolvedDelay) => {
        iziToast.show({
                    title: '',
                    backgroundColor: 'green',
                    messageColor: 'white',
                    position: 'topRight',
                    message: `Fulfilled promise in ${resolvedDelay}ms`,
});
    })
    .catch((rejectedDelay) => {
         iziToast.show({
                    title: '',
                    backgroundColor: 'red',
                    messageColor: 'white',
                    position: 'topRight',
                    message: `Rejected promise in ${rejectedDelay}ms`,
});
    });
};