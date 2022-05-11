const $faqIcon = document.querySelectorAll('.faq__container-icon');
const $mobileIcon = document.querySelector('.icon');
const $navList = document.querySelector('.header__menu-list');
const $iconArr = [...$faqIcon];

$iconArr.forEach(item => {
	item.addEventListener('click', () => item.parentNode.classList.toggle('active'));
})

$mobileIcon.addEventListener('click', () => {
	$mobileIcon.classList.toggle('open');
	$navList.classList.toggle('active');
});