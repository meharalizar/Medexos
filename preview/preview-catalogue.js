(function () {
	var form = document.querySelector('[data-preview-catalogue-form]');
	var notice = document.querySelector('[data-preview-catalogue-notice]');

	if (!form || !notice) {
		return;
	}

	form.addEventListener('submit', function (event) {
		event.preventDefault();

		if (!form.checkValidity()) {
			form.reportValidity();
			return;
		}

		var nameInput = form.querySelector('#m-name');
		var emailInput = form.querySelector('#m-email');
		var title = form.getAttribute('data-catalogue-title') || 'Medexos catalogue';
		var requester = nameInput && nameInput.value ? nameInput.value.trim() : 'there';
		var email = emailInput && emailInput.value ? emailInput.value.trim() : 'your email address';

		notice.textContent =
			'Preview confirmation: "' +
			title +
			'" request validated for ' +
			requester +
			' (' +
			email +
			'). No email is sent in the static preview; on WordPress staging this form submits to admin-post.php (medexos_request) and emails the configured PDF link.';
		notice.hidden = false;
		notice.focus();
		form.reset();
	});
})();
