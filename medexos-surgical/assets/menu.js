document.addEventListener('DOMContentLoaded', () => {
	const toggle = document.querySelector('.menu-toggle');
	const navContainer = document.querySelector('#primary-nav');

	if (!toggle || !navContainer) {
		return;
	}

	const MOBILE_BREAKPOINT = 1040;

	const closeAllSubmenus = (exceptItem = null) => {
		navContainer.querySelectorAll('.menu-item-has-children.submenu-open').forEach((item) => {
			if (item === exceptItem) {
				return;
			}
			item.classList.remove('submenu-open');
			const btn = item.querySelector(':scope > .submenu-toggle');
			if (btn) {
				btn.setAttribute('aria-expanded', 'false');
			}
		});
	};

	const setExpanded = (isOpen) => {
		toggle.setAttribute('aria-expanded', String(isOpen));
		navContainer.classList.toggle('open', isOpen);
		if (!isOpen) {
			closeAllSubmenus();
		}
	};

	toggle.addEventListener('click', () => {
		const isOpen = toggle.getAttribute('aria-expanded') === 'true';
		setExpanded(!isOpen);
	});

	// Enhance any WP-rendered .menu-item-has-children without a toggle button
	navContainer.querySelectorAll('.menu-item-has-children').forEach((item) => {
		let subToggle = item.querySelector(':scope > .submenu-toggle');
		const parentLink = item.querySelector(':scope > a');
		const subMenu = item.querySelector(':scope > .sub-menu');

		if (!subMenu) {
			return;
		}

		if (!subToggle && parentLink) {
			subToggle = document.createElement('button');
			subToggle.type = 'button';
			subToggle.className = 'submenu-toggle';
			subToggle.setAttribute('aria-expanded', 'false');
			subToggle.setAttribute('aria-label', `Toggle ${parentLink.textContent.trim()} submenu`);
			subToggle.innerHTML =
				'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="m6 9 6 6 6-6"/></svg>';
			parentLink.insertAdjacentElement('afterend', subToggle);
		}

		if (subToggle) {
			subToggle.addEventListener('click', (event) => {
				event.preventDefault();
				event.stopPropagation();
				const isSubOpen = item.classList.contains('submenu-open');
				closeAllSubmenus(item);
				item.classList.toggle('submenu-open', !isSubOpen);
				subToggle.setAttribute('aria-expanded', String(!isSubOpen));
			});
		}
	});

	navContainer.querySelectorAll('a').forEach((link) => {
		link.addEventListener('click', () => {
			if (window.innerWidth <= MOBILE_BREAKPOINT) {
				setExpanded(false);
			}
		});
	});

	document.addEventListener('click', (event) => {
		if (!navContainer.contains(event.target) && !toggle.contains(event.target)) {
			closeAllSubmenus();
		}
	});

	document.addEventListener('keydown', (event) => {
		if (event.key === 'Escape') {
			const hadOpenSub = navContainer.querySelector('.menu-item-has-children.submenu-open');
			closeAllSubmenus();
			if (navContainer.classList.contains('open')) {
				setExpanded(false);
				toggle.focus();
			} else if (hadOpenSub) {
				const btn = hadOpenSub.querySelector(':scope > .submenu-toggle');
				if (btn) {
					btn.focus();
				}
			}
		}
	});

	window.addEventListener('resize', () => {
		if (window.innerWidth > MOBILE_BREAKPOINT) {
			if (navContainer.classList.contains('open')) {
				setExpanded(false);
			}
			closeAllSubmenus();
		}
	});
});
