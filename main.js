document.addEventListener('DOMContentLoaded', () => {
	const burgerMenu = document.getElementById('burgerMenu')
	const navLinks = document.getElementById('navLinks')

	burgerMenu.addEventListener('click', () => {
		navLinks.classList.toggle('active')
	})
})
document.addEventListener('DOMContentLoaded', () => {
	const btn = document.getElementById('btn')
	const contacts = document.getElementById('contacts')

	btn.addEventListener('click', () => {
		contacts.classList.toggle('show')
	})
})

document.addEventListener('DOMContentLoaded', function() {
	const skillsLink = document.querySelector('a[href="#skills"]');
	if (skillsLink) {
			skillsLink.addEventListener('click', function(event) {
					event.preventDefault(); // Предотвращаем стандартное поведение ссылки
					const skillsSection = document.getElementById('skills');
					if (skillsSection) {
							skillsSection.scrollIntoView({ behavior: 'smooth' }); // Плавный скроллинг к секции
					}
			});
	}
});
