function focus() {
    let array = document.getElementsByTagName('input');
    for (let i = 0; i < array.length; i++) {
        array[i].addEventListener('focus', function () {
            array[i].parentNode.classList.add('focused');
        });
        array[i].addEventListener('blur', function () {
            array[i].parentNode.classList.remove('focused');
        });
    }
}
