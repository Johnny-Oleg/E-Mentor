const $faqIcon = document.querySelectorAll('.faq__container-icon');
const $mobileIcon = document.querySelector('.icon');
const $iconArr = [...$faqIcon];

$iconArr.forEach(item => {
	item.addEventListener('click', () => item.parentNode.classList.toggle('active'));
})

$mobileIcon.addEventListener('click', () => $mobileIcon.classList.toggle('open'));